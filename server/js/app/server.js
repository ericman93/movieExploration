System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, java, app, gremlin;
    return {
        setters:[],
        execute: function() {
            express = require('express');
            java = require('java');
            app = express();
            gremlin = new Gremlin({
                classpath: [],
                options: []
            });
            app.get('/', function (req, res) {
                var OrientGraph = g.java.import('com.tinkerpop.blueprints.impls.orient.OrientGraph');
                var graph = new OrientGraph('local:/path/to/database/files', 'admin', 'admin');
                var g = gremlin.wrap(graph);
                res.send('Hello2');
            });
            app.listen(1234);
        }
    }
});
//# sourceMappingURL=server.js.map