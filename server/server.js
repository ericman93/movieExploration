var express = require('express')
var orientdb = require('orientdb-js')

var app = express()
var databaseInfo = {
    database: 'movies',
    user: 'root',
    password: 'password',
};

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/explore/:type/:id', function(req, res){
    orientdb.connect(databaseInfo).then(function(graph){
        var g = graph;
        var type = req.params.type;
        var edge = type == "movie" ? "outE" : "inE"; 
        var vertex = type == "movie" ? "inV" : "outV";

        // TOOD: get nodes and their edges together
        g.V('uniqueId', req.params.id).has('type', type)[edge]()[vertex]().then(function(data){
            var nodes = data.result;
            addId(nodes);

            g.V('uniqueId', req.params.id).has('type', type)[edge]().then(function(data){
                res.send({
                    nodes: nodes,
                    edges: data.result
                });
            })
        })
    }, function(err){zv 
        res.send(err);
    });
});


function addId(nodes){
    for (var i = nodes.length - 1; i >= 0; i--) {
        console.log(nodes[i])
        nodes[i]['id'] = nodes[i]['@rid'];
    };
}

//app.get('/search/:id', function(req, res){
//    orientdb.connect(databaseInfo).then(function(graph){
//        var g = graph;
//        g.V('uniqueId', req.params.id).outE().inV().then(function(data){
//            res.send(req.params.id);
//        })
//    }, function(err){
//        res.send(err);
//    });
//});

app.listen(1234)