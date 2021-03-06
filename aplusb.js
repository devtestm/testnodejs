//var http = require('http');

var url = require('url'), express = require('express'),
	cors = require('cors'),
	Skb = require('skb');

	const app = express();
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkZWYyMzAzNTc1NzAwMTI1NmMyYzAiLCJ1c2VybmFtZSI6Im1heF9rYXJsc3J1aGVAeWFob28uZGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ4MTEyNzg0NX0.DKLsKcwPqEL-i2bf6X1-UV3yYYfyv1KU3dgHP1D46A4';
var skb = new Skb(token);

app.use(cors());

app.get('/', (req, res) => {
	res.json({
		hello: 'Task 2A'
	});
});

app.get('/task2a', (req, res) => {

	var a = req.query.a != 'undefined' ? ( (!isNaN(+req.query.a)) ? +req.query.a : 0 ) : 0;
	var b = req.query.b != 'undefined' ? ( (!isNaN(+req.query.b)) ? +req.query.b : 0 ) : 0;
	var sum = a + b;

	
	res.send(sum.toString());
});

app.listen(3000, function(){
  console.log('CORS-enabled web server listening on port 3000');
});
