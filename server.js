var	http = require('http'),
	net = require('net'),
	url = require('url'),
	exec = require('child_process').exec,
	fs = require('fs'),
	querystring = require('querystring');

var server = http.createServer(function(req, res) {
	
});

server.on('request', function(req, res) {
	if (req.method == 'GET') {
		var file = '.' + url.parse(req.url).pathname;
		console.log('GET ' + file);
		fs.stat(file, function(err, stats) {
			if (err != null) {
			if (err.errno == 2) {
				res.writeHead(404);
				res.end();
			}
			}
			else if (stats.isFile()) {
				res.writeHead(200);
				fs.createReadStream(file).pipe(res);
			}
		});
	}
	else if (req.method == 'PUT') {
		var parsed = url.parse(req.url);
		//console.log(req.url);
		//console.log(JSON.stringify(parsed));
		if (parsed.pathname == '/move') {
			var query = querystring.parse(parsed.query);
			exec('xte \'mousermove ' + query.x + ' ' + query.y + '\'');
			res.writeHead(200);
			res.end();
		}
		else if (parsed.pathname == '/click') {
			exec('xte \'mouseclick 1\'');
		}
		else {
			res.writeHead(400);
			res.end();
		}
	}
});

function moveMouse(x, y) {
}

server.listen(1337);
