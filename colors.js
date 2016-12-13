var url = require('url'), express = require('express'),
	cors = require('cors'),
	Skb = require('skb');
	hsl = require('hsl-to-hex');
	var convert = require('color-convert');

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
		hello: 'Task 2D'
	});
});

app.get('/task2d', (req, res) => {
	var color = 'Invalid color';

	rawColor = req.query.color;
	//console.log(rawColor);

	//console.log(decodeURIComponent(decodeURIComponent(rawColor.trim())));
	//console.log(rawColor != 'undefined');
	//console.log(rawColor == 'undefined');
	if(typeof rawColor !== 'undefined')
		color = (rawColor.length > 0) ? toHex(unescape(rawColor.trim())) : 'Invalid color';

	res.send(color);
});

function toHex(rawColor)
{
	var color = rawColor.toLowerCase();

	console.log(color);
	

	const re = new RegExp('^[#0-9a-f]+$');
	var x = color.match(re);

	//console.log(x);

	var format = (x != null) ? 'hex' : ( (color.search('rgb') > -1) ? 'rgb' : ( (color.search('hsl') > -1) ? 'hsl' : (color.search('hwb') > -1) ? 'hwb' : 'Invalid color'));

	console.log(format);

	switch(format)
	{
		case 'hex':
			color = (color.search('\\#') == 0) ? color.substring(1) : color;
			if(color.length < 6){
				if(color.length == 3)
					color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
				else return 'Invalid color';
			} else if (color.length > 6) return 'Invalid color';
			break;

		case 'rgb':
			//console.log(color + ' : ' + color.substring(0,3));
			if(color.substring(0,3) != 'rgb') return 'Invalid color'
			//console.log('1');
			color = color.substring(color.indexOf('(') + 1);
			//console.log('2');
			if(color.length -1 != color.search('\\)')) return 'Invalid color';
			//console.log('3');
			color = color.substring(0, color.length - 1);
			rgbcolors = color.split(',');
			//console.log(rgbcolors.length);
			if(rgbcolors.length != 3) return 'Invalid color';
			color = ( (parseInt(rgbcolors[0]) >= 0 && parseInt(rgbcolors[0]) < 256) && 
					  (parseInt(rgbcolors[1]) >= 0 && parseInt(rgbcolors[1]) < 256) && 
					  (parseInt(rgbcolors[2]) >= 0 && parseInt(rgbcolors[2]) < 256) ) ? 

			( hexForm(rgbcolors[0]) + hexForm(rgbcolors[1]) + hexForm(rgbcolors[2]) ) : 'Invalid color';
			
			//console.log('color:' + rgbcolors[0].toString(16));
			break;

		case 'hsl':
			if(color.substring(0,3) != 'hsl') return 'Invalid color'
			//console.log('HSL: ' + color);
			color = hslForm(color);
			break;

		case 'hwb':
			color = colorToHex(format, color);
			break;

		default:
			return 'Invalid color';
	}

	return color == 'Invalid color' ? color : (color.charAt(0) == '#' ? color : '#' + color);
}

function colorToHex(inputformat, str)
{
	console.log(str);
	var color = str.substring(str.indexOf('(') + 1);
	if(color.length -1 != color.search('\\)')) return 'Invalid color';
	color = color.substring(0, color.length - 1);
	colors = color.split(',');

	var first = colors[0];
	var second = colors[1];
	var third = colors[2];

	const re = new RegExp('^[0-9]+$');

	var x = first.match(re);
	if(x == null) return 'Invalid color';
	first = parseInt(first);
	if(first < 0 || first > 360) return 'Invalid color';

	second = parseInt(second);
	third = parseInt(third);
	if(isNaN(first) || isNaN(second) || isNaN(third)) return 'Invalid color';

	switch(inputformat)
	{
		case 'hwb': 
			return convert.hwb.hex(first, second, third);
			break;

	}
}

function hexForm(str)
{
	// parseInt(rgbcolors[0]).toString(16) + parseInt(rgbcolors[1]).toString(16) + parseInt(rgbcolors[2]).toString(16)
	var hex = parseInt(str) < 10 ? '0' + parseInt(str).toString(16) : parseInt(str).toString(16);
	return hex;
}

function hslForm(str)
{
	var color = str.substring(str.indexOf('(') + 1);
	if(color.length -1 != color.search('\\)')) return 'Invalid color';
	color = color.substring(0, color.length - 1);
	hslcolors = color.split(',');

	var hue = hslcolors[0]; //hsl(133, 40, 60);
	var saturation = hslcolors[1];
	var luminosity = hslcolors[2];

	const re = new RegExp('^[0-9]+$');

	var x = hue.match(re);
	if(x == null) return 'Invalid color';
	hue = parseInt(hue);
	if(hue < 0 || hue > 360) return 'Invalid color';

	//if(saturation.charAt(0) == '%') saturation = saturation.substring(1);
	//if(luminosity.charAt(0) == '%') luminosity = luminosity.substring(1);
	if(saturation.search('\\%') < 0 || luminosity.search('\\%') < 0) return 'Invalid color';
	
	//console.log(saturation); 	console.log(luminosity);

	saturation = parseInt(saturation);
	luminosity = parseInt(luminosity);
	//console.log(saturation); 	console.log(luminosity);
	if(isNaN(hue) || isNaN(saturation) || isNaN(luminosity)) return 'Invalid color';
	if(saturation < 0 || saturation > 100) return 'Invalid color'; 	
	if(luminosity < 0 || luminosity > 100) return 'Invalid color';

	var hex = hsl(hue, saturation, luminosity);
	//console.log('HEX: ' + hex);
	return hex;
}

app.listen(3000, function(){
	
  console.log('CORS-enabled web server listening on port 3000');
});