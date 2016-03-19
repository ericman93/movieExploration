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
                }
                MovieGraph.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.chart = new NetChart({
                        container: document.getElementById("netchart"),
                        area: { height: 700 },
                        style: {
                            node: { display: "image", lineWidth: 10, imageCropping: true },
                            nodeStyleFunction: this.nodeStyle,
                            linkStyleFunction: this.edgeStyle
                        },
                        events: {
                            // in that way i can still use the private members (StackOverflow Issue: 20627138)
                            onDoubleClick: function (event) { _this.exploreMovie(event); }
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
                MovieGraph.prototype.exploreMovie = function (event) {
                    var _this = this;
                    if (event.clickNode) {
                        var currentMovie = event.clickNode.data;
                        this._movieService.explore(currentMovie.uniqueId, currentMovie.type)
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
                    }
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