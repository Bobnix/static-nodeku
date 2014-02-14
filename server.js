var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var url = require("url");
var filesys = require("fs");
var properties = require("./properties.js");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(request, response) {
  var my_path = url.parse(request.url).pathname;  
	if(my_path == '/'){
		my_path = '/index.html';
	}
	
	var full_path = path.join(process.cwd(),properties.webroot,my_path);  
	filesys.exists(full_path,function(exists){  
		if(!exists){  
			response.writeHeader(404, {"Content-Type": "text/plain"});    
			response.write("404 Not Found\n");    
			response.end();  
		}  
		else{  
			filesys.readFile(full_path, "binary", function(err, file) {    
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