title: 《Node.js the Right Way》
date: 2015/12/11 12:00:00
tags: [JavaScript,Node.js]
categories: [Web前端]
---
This article is reading notes of [Node.js the Right Way](http://book.douban.com/subject/25774746/) written by Jim R. Wilson
## Networking with Sockets(TCP and Unix)
In Node.js, the bind and connect operations are provided by the net module.
### Server Side
```javascript
"use strict"; 
const 
	net = require('net'),
	server = net.createServer(function(connection) {
	 // use connection object for data transfer 
	}); 
	server.listen(5432);
```
<!--more-->
If you want net module to use Unix sockets,you may change the listen section to this:
```javascript
server.listen('/tmp/watcher.sock', function() { 
	console.log('Listening for subscribers...'); 
});
```
**Unix** sockets can be faster than **TCP** sockets because they don’t require invoking network hardware. However, they’re **local** to the machine.
### Client Side
```javascript
"use strict"; 
	const net = require('net'), 
		client = net.connect({port: 5432}); 
	client.on('data', function(data) { 
		let message = JSON.parse(data); 
		if (message.type === 'watching') { 
		console.log("Now watching: " + message.file); 
		} else if (message.type === 'changed') { 
			let date = new Date(message.timestamp); 
			console.log("File '" + message.file + "' changed at " + date);
		} else { 
			throw Error("Unrecognized message type: " + message.type); 
		} 
	});
```
This short program uses net.connect() to create a client connection to localhost port 5432, then waits for data.

### tips
**talnet** for win environment and **nc** for Unix-like environments.
Visit [NET](https://nodejs.org/dist/latest-v5.x/docs/api/net.html) API document for more information about net module.
## Scalable Web Services
### Express
Using **express** module to make our own RESTful APIs.
```javascript
'use strict'; 
const 
	express = require('express'), 
	app = express(); 
app.use(express.logger('dev')); 
app.get('/api/:name', function(req, res) { 
	res.json(200, { "hello": req.params.name }); 
}); 
app.listen(3000, function(){ 
	console.log("ready captain."); 
});
```
In addition to get(), Express has put(), post(), and del() to register handlers for PUT, POST, and DELETE requests, respectively. 
### Serving Static Content with Express
```javascript
app.use(express.static(__dirname + '/static')); 
app.use(express.static(__dirname + '/bower_components'));
```
These two lines tell Express to serve static content out of the static/ and bower_components/ directories of the project. This means that if Express can not find a particular route, it will fall back to serving the static content, checking these directories one at a time. 
For instance, the project static/ directory contains three files: index.html, app.css, and app.js. These contain the HTML, CSS, and client-side JavaScript for the b4 application, respectively. 
With the server running, when you request http://localhost:3000/index.html, Express will serve up static/index.html because we do not have an explicit route for it.
