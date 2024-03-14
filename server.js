// load the http and file system modules into respective variables
// 		http module allows to create a server
//		fs module allows to access file system (i.e., files that we will be serving are in our file system)
var http = require('http'),
	fs = require('fs');

const PORT = 1337;



function serveStaticFile(res, path, contentType, responseCode) {
	// if there is no http response status code, then assume everything is okay 
	//		set http response status code to 200 to tell browser everything is okay 
	if(!responseCode) {
		responseCode = 200;
	}
	
	// try to read the file that is located at the path that is being passed in
	//		__dirname resolves to the path where this file lives
	fs.readFile(__dirname + path, function(err,data) {
		// tell browser there was an internal server error
		if(err) {
			// include in our header that there was an internal server error
			res.writeHead(500, { 'Content-Type': 'text/plain' });

			// give the user an error messaage in plain text and tell browser all info has been sent
			res.end('500 - Internal Error');
		} 

		// otherwise, we know that there is no error and that it works
		else {
			// give it whatever the response code and content type was
			res.writeHead(responseCode,
				{ 'Content-Type': contentType });

			// send over whatever data we have
			res.end(data);
		}
	});
}


http.createServer(function(req,res) {
	// normalize url by removing querystring, optional trailing slash, and making lowercase
	//		replace function takes in what to replace using regular expression that says find anything after ?
	// 			and replace with nothing
	// 		make everything lower case
	var path = req.url.replace(/\/?(?:\?.*)?$/, '')
			.toLowerCase();


	switch(path) {

		// if they go to http://localhost:1337, then serve the home page
		// 		break tells switch statement that this case is over and done executing
		case '':
			serveStaticFile(res, '/public/index.html', 'text/html'); 
			break;

		// if they go to http://localhost:1337/index, then serve the home page
		case '/index':
			serveStaticFile(res, '/public/index.html', 'text/html'); 
			break;

		// if they go to http://localhost:1337/about,then serve the about page
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');  
			break;

		case '/js/myScript.js':
			serveStaticFile(res, '/public/js/myScript.js', 'application/javascript');  
			break;

		// if they go a page with image,then serve the image on this page
		case '/img/logo.jpeg':
			serveStaticFile(res, '/public/img/logo.jpeg', 'image/jpeg');  
			break;

		// if they go a page with image,then serve the image on this page
		case '/img/404bottom.gif':
			serveStaticFile(res, '/public/img/404bottom.gif', 'image/gif');  
			break;

		// if they go a page with image,then serve the image on this page
		case '/img/404mid.gif':
			serveStaticFile(res, '/public/img/404mid.gif', 'image/gif');  
			break;

		// if they go a page with image,then serve the image on this page
		case '/img/404top_w.jpg':
			serveStaticFile(res, '/public/img/404top_w.jpg', 'image/jpeg');  
			break;

		// if they go a page with image,then serve the image on this page
		case '/img/x.png':
			serveStaticFile(res, '/public/img/x.png', 'image/png');  
			break;

		// in the case that it is none of the above cases, we have a default case so that our server does not break
		//		and we serve the 404 page
		//      we let server know that something went wrong by setting http response status code to 404 
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404);
			break;

}
}).listen(PORT); // tells the server what port to be on


console.log("Server running on: http://localhost:" + PORT);