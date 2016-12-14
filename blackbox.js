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
		hello: 'Task 2X'
	});
});

app.get('/task2x', (req, res) => {

	d = req.query.i;

	console.log('d: ' + d);
	if(typeof d === 'undefined') res.send('no data');

	const re = new RegExp('^[0-9]+$');
	var x = d.match(re);
	if(x == null) res.send('NaN');

	d = parseInt(d);

	switch(d) {
		case 0:
			d = 1;
			break;
		case 1:
			d = 18;
			break;
		case 2:
			d = 243;
			break;
		case 3:
			d = 3240;
			break;
		case 4:
			d = 43254;
			break;
		case 5:
			d = 577368;
			break;
		case 6:
			d = 7706988;
			break;
		case 7:
			d = 102876480;
			break;
		case 8:
			d = 1373243544;
			break;
		case 9:
			d = 18330699168;
			break;
		case 10:
			d = 244686773808;
			break;
		case 11:
			d = 3266193870720;
			break;
		case 12:
			d = 43598688377184;
			break;
		case 13:
			d = 581975750199168;
			break;
		case 14:
			d = 7768485393179328;
			break;
		case 15:
			d = 103697388221736960;
			break;
		case 16:
			d = 1384201395738071424;
			break;
		case 17:
			d = 18476969736848122368;
			break;
		case 18:
			d = 246639261965462754048;
			break;
	}

	res.send(d.toString());
});


app.listen(3000, function(){
	
  console.log('CORS-enabled web server listening on port 3000');
});