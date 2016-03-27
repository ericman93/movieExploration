import {Component} from 'angular2/core';
import {MovieService} from './movies.service';
import {Movie} from './core/movie'

@Component({
    selector: 'movies-garph',
    template: '<div id="netchart"></div>'
})
export class MovieGraph {
    private chart: NetChart;
    private nodeId: number;
    private overlayCharts
    private pieChartDataCache;

    constructor(private _movieService: MovieService) {
        this.nodeId = 0;
        this.overlayCharts = <IDictionary<INodeCharts>>new Object(null);
        this.pieChartDataCache = [];
    }

    ngAfterContentInit() {
        this.chart = new ZoomCharts.NetChart({
            container: document.getElementById("netchart"),
            area: { height: 700 },
            style: {
                node: { display: "image", lineWidth: 10, imageCropping: true },
                nodeStyleFunction: this.nodeStyle,
                linkStyleFunction: this.edgeStyle
            },
            events: {
                // in that way i can still use the private members (StackOverflow Issue: 20627138)
                onDoubleClick: (event) => { this.exploreMovie(event); },
                onSelectionChange: (event, args) => { this.selectionChanged(event, args) },
                onPositionChange: () => { this.movePieChart() }
            },
            interaction: { selection: { lockNodesOnMove: false } }
        });
    }

    nodeStyle(node) {
        node.label = node.data.title;
        node.lineColor = node.data.type == "movie" ? "orange" : node.data.type == "actor" ? "red" : "green";

        node.image = node.data.img;
    }

    edgeStyle(link) {
        if (link.data.character) {
            link.items = [
                {   // Default item places just as the regular label.
                    text: link.data.character,
                    backgroundStyle: {
                        fillColor: "#f3f3f3",
                        lineColor: "#ccc"
                    }
                }
            ]
        }

        link.fillColor = link.data.role == "actor" ? "red" : "green";
    }

    exploreMovie(node) {
        this._movieService.explore(node.uniqueId, node.type)
            .subscribe(
            movies => {
                movies.nodes.forEach((movie) => {
                    this.chart.addData({
                        nodes: [movie],
                        links: []
                    });
                });

                this.chart.addData({
                    nodes: [],
                    links: movies.edges.map(edge => {
                        return {
                            'id': edge.role + '-' + edge.in + "-" + edge.out,
                            'from': edge.in,
                            'to': edge.out,
                            'character': edge.character,
                            'role': edge.role
                        }
                    })
                });
            },
            error => console.error(error)
            );
    }

    addMovie(fromMovieId, movie) {
        this.chart.addData({
            nodes: [movie],
            //links: [{
            //    "id": (fromMovieId + "-" + movie.id),
            //    from: fromMovieId,
            //    to: movie.id
            //}]
            links: []
        });
    }

    addMovieToGarph(query) {
        console.log("query : " + query);

        this._movieService.getMovieByName(query)
            .subscribe(
            movies => {
                console.log(movies);
                movies.forEach((movie) => {
                    this.chart.addData({
                        nodes: [movie],
                        links: []
                    });
                });
            },
            error => console.error(error)
            );
    }

    selectionChanged(event: ZoomCharts.Configuration.BaseMouseEvent, args: ZoomCharts.Configuration.NetChartChartEventArguments) {
        var oldCharts = this.overlayCharts;
        this.overlayCharts = <IDictionary<INodeCharts>>new Object(null);

        for (let i = 0; i < args.selection.length; i++) {
            let node = <ZoomCharts.Configuration.ItemsChartNode>args.selection[i];

            if (oldCharts[node.id]) {
                this.overlayCharts[node.id] = oldCharts[node.id];
                delete oldCharts[node.id];
            } else {
                let newChart = this.createPieChart(node);
                this.overlayCharts[node.id] = {
                    node: node,
                    pieChart: newChart.pieChart,
                    pieChartSettings: newChart.pieChartSettings,
                    timeChart: null,
                    timeChartSettings: null
                };
            }
        }

        let keys = Object.keys(oldCharts);
        for (let i = 0; i < keys.length; i++) {
            let item = oldCharts[keys[i]];
            if (item.timeChart)
                item.timeChart.remove();
            item.pieChart.remove();
            item.pieChart = null;
            item.timeChart = null;
        }
    }

    createPieChart(node: ZoomCharts.Configuration.ItemsChartNode) {
        let dimensions = this.getPieChartDimensions(node);
        let settings: ZoomCharts.Configuration.PieChartSettings = {
            parentChart: this.chart,
            area: dimensions.area,
            pie: dimensions.pie,
            data: [{ preloaded: { subvalues: this.getPieChartData(node.id) } }],
            labels: {
                enabled: false
            },
            events: {
                onClick: (e, a) => {
                    if (a.slice.id == "explore") {
                        this.exploreMovie(node.data);
                    }
                    else {
                        alert(node.data.info);
                    }
                }
            },
            icons: {
                autohideWhenTooSmall: false,
                sizeExtent: [0, 64]
            },
            credits: {
                enabled: false
            }
        };
        settings.pie.adaptiveRadius = false;
        //settings.pie.styleFunction = (pie: ZoomCharts.Configuration.PieChartPie) => {
        //    pie.sliceColors = [pie.parentSlice.fillColor];
        //    pie.colorDistribution = "gradient";
        //};

        return { pieChart: new PieChart(settings), pieChartSettings: settings };
    }

    getPieChartDimensions(node: ZoomCharts.Configuration.ItemsChartNode) {
        var dimensions = this.chart.getNodeDimensions(node);
        return {
            area: {
                left: dimensions.x - dimensions.radius * 5,
                top: dimensions.y - dimensions.radius * 5,
                width: dimensions.radius * 10,
                height: dimensions.radius * 10
            },
            pie: {
                radius: dimensions.radius + (dimensions.radius / 2),
                innerRadius: dimensions.radius,
                centerMargin: dimensions.radius * 0.7
            }
        };
    }

    getPieChartData(nodeId: string) {
        if (!this.pieChartDataCache[nodeId]) {

            let pieChartData = [
                { id: "info", value: 0, style: { fillColor: '#27ab19' } },
                { id: "explore", value: 0, style: { fillColor: '#275bf9' } },
            ];

            this.pieChartDataCache[nodeId] = pieChartData;
        }

        return this.pieChartDataCache[nodeId];
    }

    movePieChart() {
        let keys = Object.keys(this.overlayCharts);
        for (let i = 0; i < keys.length; i++) {
            let item = this.overlayCharts[keys[i]];

            let newPieChartSettings = this.getPieChartDimensions(item.node);
            if (item.pieChartSettings.area.left !== newPieChartSettings.area.left
                || item.pieChartSettings.area.top !== newPieChartSettings.area.top
                || item.pieChartSettings.pie.radius !== newPieChartSettings.pie.radius
            ) {
                item.pieChartSettings = newPieChartSettings;
                item.pieChart.updateSettings(newPieChartSettings);
            }
        }
    }
}