System.register(['rxjs/Rx', 'angular2/platform/browser', 'angular2/http', './movies.app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, movies_app_1;
    return {
        setters:[
            function (_1) {},
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (movies_app_1_1) {
                movies_app_1 = movies_app_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(movies_app_1.MoviesApp, [http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map