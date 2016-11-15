var http = require("http");
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var url = require('url');

function start(route, handle) {
	function onRequest(request, response) {
    	var postData = "";
    	var pathname = url.parse(request.url).pathname;
    	if (!pathname.indexOf('/favicon.ico')) {
            return; 
        };
        console.log("Request for " + pathname + " received.");
    	request.setEncoding("utf8");
    	request.addListener("data", function(postDataChunk) {
      		postData += postDataChunk;
    	});
    	request.addListener("end", function() {
    		route(handle, pathname, response, postData, request.url);
    	});
	}

	http.createServer(onRequest).listen(8000);
	console.log("Server has started.");
}

exports.start = start;