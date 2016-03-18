var express = require('express')
var http = require('https');

var api_key = 'c8605a69c7676f05c91515ce4f2dc937'

var app = express()

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

app.get('/', function(req,res){
	res.send('123');
});

app.get('/explore/:type/:id', function(req, res){
	var type = req.params.type == 'movie' ? 'movie' : 'person';

	http.get('https://api.themoviedb.org/3/'+type+'/'+req.params.id+'?append_to_response=credits&api_key='+api_key, function(response){
		response.on('data', function(d){
			console.log(d);
			console.log('~~~~~~~~')
	    	res.send(JSON.parse(d));
		});

	}).on('error', function(error){
		res.send(error);
	});
});

app.get('/search', function(req, res){
	http.get('https://api.themoviedb.org/3/search/movie?query='+req.query.q+'&api_key='+api_key, function(response){
		var responseParts = [];

	    response.on("data", function(chunk) {
	        responseParts.push(chunk);
	    });
	    response.on("end", function(){
	    	var data = JSON.parse(responseParts.join(''));
	        res.send(data["results"].map(function(movie){
	        	return {
	        		img: "http://image.tmdb.org/t/p/w500/"+movie["poster_path"],
	        		title: movie["title"],
	        		id: movie["id"]
	        	}
	        }));
	    });

	}).on('error', function(error){
		res.send(error);
	});
});

app.listen(1234)