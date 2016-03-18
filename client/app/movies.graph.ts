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

    constructor(private _movieService: MovieService) {
        this.nodeId = 0;
    }

    ngAfterContentInit() {
        this.chart = new NetChart({
            container: document.getElementById("netchart"),
            area: { height: 700 },
            style: {
                node: { display: "image", lineWidth: 10, imageCropping: true },
                nodeStyleFunction: this.nodeStyle,
                linkStyleFunction: this.edgeStyle
            },
            data: {
                preloaded: {
                    nodes: [
                        {
                            id: '#12:0',
                            uniqueId: "27205",
                            title: 'Inception',
                            type: "movie",
                            '@rid': '#12:0',
                            out_movieactor: [],
                            img: 'http://image.tmdb.org/t/p/w500//qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
                        },
                    ]
                }
            },
            events: {
                // in that way i can still use the private members (StackOverflow Issue: 20627138)
                onDoubleClick: (event) => { this.exploreMovie(event); }
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

    exploreMovie(event) {
        if (event.clickNode) {
            var currentMovie = event.clickNode.data;

            this._movieService.explore(currentMovie.uniqueId, currentMovie.type)
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
}