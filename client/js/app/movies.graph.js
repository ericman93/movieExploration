System.register(['angular2/core', './movies.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, movies_service_1;
    var MovieGraph;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (movies_service_1_1) {
                movies_service_1 = movies_service_1_1;
            }],
        execute: function() {
            MovieGraph = (function () {
                function MovieGraph(_movieService) {
                    this._movieService = _movieService;
                    this.nodeId = 0;
                    this.overlayCharts = new Object(null);
                    this.pieChartDataCache = [];
                }
                MovieGraph.prototype.ngAfterContentInit = function () {
                    var _this = this;
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
                            onDoubleClick: function (event) { _this.exploreMovie(event); },
                            onSelectionChange: function (event, args) { _this.selectionChanged(event, args); },
                            onPositionChange: function () { _this.movePieChart(); }
                        },
                        interaction: { selection: { lockNodesOnMove: false } }
                    });
                };
                MovieGraph.prototype.nodeStyle = function (node) {
                    node.label = node.data.title;
                    node.lineColor = node.data.type == "movie" ? "orange" : node.data.type == "actor" ? "red" : "green";
                    node.image = node.data.img;
                };
                MovieGraph.prototype.edgeStyle = function (link) {
                    if (link.data.character) {
                        link.items = [
                            {
                                text: link.data.character,
                                backgroundStyle: {
                                    fillColor: "#f3f3f3",
                                    lineColor: "#ccc"
                                }
                            }
                        ];
                    }
                    link.fillColor = link.data.role == "actor" ? "red" : "green";
                };
                MovieGraph.prototype.exploreMovie = function (node) {
                    var _this = this;
                    this._movieService.explore(node.uniqueId, node.type)
                        .subscribe(function (movies) {
                        movies.nodes.forEach(function (movie) {
                            _this.chart.addData({
                                nodes: [movie],
                                links: []
                            });
                        });
                        _this.chart.addData({
                            nodes: [],
                            links: movies.edges.map(function (edge) {
                                return {
                                    'id': edge.role + '-' + edge.in + "-" + edge.out,
                                    'from': edge.in,
                                    'to': edge.out,
                                    'character': edge.character,
                                    'role': edge.role
                                };
                            })
                        });
                    }, function (error) { return console.error(error); });
                };
                MovieGraph.prototype.addMovie = function (fromMovieId, movie) {
                    this.chart.addData({
                        nodes: [movie],
                        //links: [{
                        //    "id": (fromMovieId + "-" + movie.id),
                        //    from: fromMovieId,
                        //    to: movie.id
                        //}]
                        links: []
                    });
                };
                MovieGraph.prototype.addMovieToGarph = function (query) {
                    var _this = this;
                    console.log("query : " + query);
                    this._movieService.getMovieByName(query)
                        .subscribe(function (movies) {
                        console.log(movies);
                        movies.forEach(function (movie) {
                            _this.chart.addData({
                                nodes: [movie],
                                links: []
                            });
                        });
                    }, function (error) { return console.error(error); });
                };
                /* Move to seperate class */
                MovieGraph.prototype.selectionChanged = function (event, args) {
                    var oldCharts = this.overlayCharts;
                    this.overlayCharts = new Object(null);
                    for (var i = 0; i < args.selection.length; i++) {
                        var node = args.selection[i];
                        if (oldCharts[node.id]) {
                            this.overlayCharts[node.id] = oldCharts[node.id];
                            delete oldCharts[node.id];
                        }
                        else {
                            var newChart = this.createPieChart(node);
                            this.overlayCharts[node.id] = {
                                node: node,
                                pieChart: newChart.pieChart,
                                pieChartSettings: newChart.pieChartSettings,
                                timeChart: null,
                                timeChartSettings: null
                            };
                        }
                    }
                    var keys = Object.keys(oldCharts);
                    for (var i = 0; i < keys.length; i++) {
                        var item = oldCharts[keys[i]];
                        if (item.timeChart)
                            item.timeChart.remove();
                        item.pieChart.remove();
                        item.pieChart = null;
                        item.timeChart = null;
                    }
                };
                MovieGraph.prototype.createPieChart = function (node) {
                    var _this = this;
                    var dimensions = this.getPieChartDimensions(node);
                    var settings = {
                        parentChart: this.chart,
                        area: dimensions.area,
                        pie: dimensions.pie,
                        data: [{ preloaded: { subvalues: this.getPieChartData(node.id) } }],
                        labels: {
                            enabled: false
                        },
                        events: {
                            onClick: function (e, a) {
                                if (a.slice.id == "explore") {
                                    _this.exploreMovie(node.data);
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
                };
                MovieGraph.prototype.getPieChartDimensions = function (node) {
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
                };
                MovieGraph.prototype.getPieChartData = function (nodeId) {
                    if (!this.pieChartDataCache[nodeId]) {
                        var pieChartData = [
                            { id: "info", value: 0, style: { fillColor: '#27ab19' } },
                            { id: "explore", value: 0, style: { fillColor: '#275bf9' } },
                        ];
                        this.pieChartDataCache[nodeId] = pieChartData;
                    }
                    return this.pieChartDataCache[nodeId];
                };
                MovieGraph.prototype.movePieChart = function () {
                    var keys = Object.keys(this.overlayCharts);
                    for (var i = 0; i < keys.length; i++) {
                        var item = this.overlayCharts[keys[i]];
                        var newPieChartSettings = this.getPieChartDimensions(item.node);
                        if (item.pieChartSettings.area.left !== newPieChartSettings.area.left
                            || item.pieChartSettings.area.top !== newPieChartSettings.area.top
                            || item.pieChartSettings.pie.radius !== newPieChartSettings.pie.radius) {
                            item.pieChartSettings = newPieChartSettings;
                            item.pieChart.updateSettings(newPieChartSettings);
                        }
                    }
                };
                MovieGraph = __decorate([
                    core_1.Component({
                        selector: 'movies-garph',
                        template: '<div id="netchart"></div>'
                    }), 
                    __metadata('design:paramtypes', [movies_service_1.MovieService])
                ], MovieGraph);
                return MovieGraph;
            }());
            exports_1("MovieGraph", MovieGraph);
        }
    }
});
//# sourceMappingURL=movies.graph.js.map