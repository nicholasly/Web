var fs = require('fs');
function route(handle, pathname, response, postData, _url) {
	console.log("About to route a request for " + pathname);
	var warning = "";
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData, _url, warning);
	} else {
    	console.log("No request handler found for " + pathname);
   		response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("404 Not found");
    	response.end();
	}
}

exports.route = route;