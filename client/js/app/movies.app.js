System.register(['angular2/core', './movies.graph', './movies.service'], function(exports_1, context_1) {
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
    var core_1, movies_graph_1, movies_service_1;
    var MoviesApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (movies_graph_1_1) {
                movies_graph_1 = movies_graph_1_1;
            },
            function (movies_service_1_1) {
                movies_service_1 = movies_service_1_1;
            }],
        execute: function() {
            MoviesApp = (function () {
                function MoviesApp() {
                }
                MoviesApp = __decorate([
                    core_1.Component({
                        selector: 'movies-app',
                        template: "<h1>explore</h1>\n               <div>\n                    <input type=\"text\" [(ngModel)]=\"query\" />\n                    <input type=\"button\" (click)=\"g.addMovieToGarph(query)\" value=\"Search\" />\n                </div>\n                <movies-garph #g></movies-garph>\n    ",
                        directives: [movies_graph_1.MovieGraph],
                        providers: [movies_service_1.MovieService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MoviesApp);
                return MoviesApp;
            }());
            exports_1("MoviesApp", MoviesApp);
        }
    }
});
//# sourceMappingURL=movies.app.js.map