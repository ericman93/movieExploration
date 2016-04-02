var express = require('express')
var orientdb = require('orientdb-js')

var app = express()
var databaseInfo = {
    database: 'movies',
    user: 'root',
    password: '789798',
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
            setConnection(nodes, g);

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

// should charater names will be included in seach?
app.get('/search', function(req, res){
    console.log('sercing for ' + req.query.q)
    orientdb.connect(databaseInfo).then(function(graph){
        console.log('connect')
        var g = graph;
        
        g.V().has('title', req.query.q).then(function(result){
            addId(result.result);
            res.send(result.result);
        });
    });
});

function setConnection(nodes, g){
    var connection_types = {
        movie: ['out_moviedirector', 'out_movieactor'],
        director: ['in_moviedirector'],
        actor: ['in_movieactor']
    }

     for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        var connections  = connection_types[node['type']].map((name) => node[name]).reduce((x,y) => x.concat(y), []);
        node["connections"] = [];

        connections.filter(connection => connection != undefined)
                   .forEach(connection => {
                        //node["connections"].push(connection)
                        g.e(connection.substr(1)).then(function(edge){
                            node["connections"].push(edge.result[0]);
                        });
                     });
                    };
}

function addId(nodes){
    for (var i = nodes.length - 1; i >= 0; i--) {
        nodes[i]['id'] = nodes[i]['@rid'];
    };
}

app.listen(1234)