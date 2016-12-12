//var http = require('http');

var url = require('url'), express = require('express'),
	cors = require('cors'),
	Skb = require('skb');

	const app = express();

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkZWYyMzAzNTc1NzAwMTI1NmMyYzAiLCJ1c2VybmFtZSI6Im1heF9rYXJsc3J1aGVAeWFob28uZGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ4MTEyNzg0NX0.DKLsKcwPqEL-i2bf6X1-UV3yYYfyv1KU3dgHP1D46A4';
var skb = new Skb(token);

app.use(cors());

app.get('/', (req, res) => {
	res.json({
		hello: 'Task 2B'
	});
});

app.get('/task2b', (req, res) => {

	var username = req.query.fullname;
	
	console.log(username);
	if(username != 'undefined' && username.search(/[0-9_/]/) == -1)
	{
		fullname = username.trim().split(/[\s,]+/);
		
		if (fullname.length == 1) 
			if(fullname[0].length == 0) username = 'Invalid fullname';
			else
				username = fullname[0].charAt(0).toUpperCase() + fullname[0].substr(1).toLowerCase();
		if(fullname.length == 2) username = fullname[1].charAt(0).toUpperCase() + fullname[1].substr(1).toLowerCase() + ' ' + fullname[0].substring(0,1).toUpperCase() + '.';
		if(fullname.length == 3) username = fullname[2].charAt(0).toUpperCase() + fullname[2].substr(1).toLowerCase() + ' ' + fullname[0].substring(0,1).toUpperCase() + '. ' + fullname[1].substring(0,1).toUpperCase() + '.';
		if(fullname.length > 3 || fullname.length < 1) username = 'Invalid fullname';
		
		console.log('OK: ' + req.query.fullname + ' ' + fullname.length);
	}
	else
		username = 'Invalid fullname';
	res.send(username);
});

app.get('/task2c', (req, res) => {

	var username = req.query.username;

	var u = canonize(username);
	console.log(u);
	if(u == null)
	{
		username = username.trim().substring(username.indexOf('/') + 1);
		
		username = (username.search('\\?') >= 0) ? username.substring(0,username.indexOf('?')) : username;
		
	}
	else {
		username = u;
		
	}

	username = (username.search('/') >= 0) ? username.substring(0,username.indexOf('/')) : username;
	username = (username.search('&') >= 0) ? username.substring(0,username.indexOf('&')) : username; 
	username = (username.search('@') >= 0) ? username.substring(username.lastIndexOf('@') + 1) : username; 

	console.log(username);


	
	res.send('@' + username);
});

function canonize(url) {
	const re = new RegExp('^(.*?//.*?/)(.*)$');
	const username = url.match(re);
	console.log(username);
	return username == null ? null : username[2];
}

app.listen(3000, function(){
	
  console.log('CORS-enabled web server listening on port 3000');
});
