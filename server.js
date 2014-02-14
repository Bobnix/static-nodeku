var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var url = require("url");
var filesys = require("fs");
var properties = require("./properties.js");
var app = express();

app.use(logfmt.requestLogger());

app.get('*', function(request, response) {
  var urlPath = url.parse(request.url).pathname;  
	if(urlPath == '/'){
		urlPath = '/index.html';
	}
	
	var fsPath = path.join(process.cwd(),properties.webroot,urlPath); 
	console.log("Resource path " + fsPath);	
	filesys.exists(fsPath,function(exists){  
		if(!exists){  
			response.writeHeader(404, {"Content-Type": "text/plain"});    
			response.write("404 Not Found\n");    
			response.end();  
		}  
		else{  
			filesys.readFile(fsPath, "binary", function(err, file) {    
				 if(err) {    
					 response.writeHeader(500, {"Content-Type": "text/plain"});    
					 response.write(err + "\n");    
					 response.end();    
				 
				 }    
				 else{  
					response.writeHeader(200);    
					response.write(file, "binary");    
					response.end();  
				}  
					   
			});  
		}  
	}); 
});

var port = Number(process.env.PORT || properties.defaultPort);
app.listen(port, function() {
  console.log("Listening on " + port);
});