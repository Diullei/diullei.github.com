var http = require('http');
var fs = require('fs');
var path = require('path');
 
var port = 8125;
if(process.argv.length > 2) {
	console.log('port: ' + process.argv[2]);
	try{
		port = process.argv[2];
	}catch(e){
		console.log(e.message);
	}
} 

var virtual_path = '.';
if(process.argv.length > 3) {
	console.log('virtual_path: ' + process.argv[3]);
	try{
		virtual_path = process.argv[3];
	}catch(e){
		console.log(e.message);
	}
} 

http.createServer(function (request, response) {
 
    console.log('request starting: ' + request.url);
     
    var filePath = virtual_path + request.url;
	
	if(filePath.indexOf('?') != -1)
		filePath = filePath.substr(0, filePath.indexOf('?'));
	
    if (filePath == virtual_path + '/')
        filePath = virtual_path + '/index.html';
         
	console.log(filePath);	 
		 
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(port);
 
console.log('Server running at http://127.0.0.1:' + port + '/');