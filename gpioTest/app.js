var gpio = require('onoff').Gpio,
	btn = new gpio(17, 'in', 'both');
	led = new gpio(18, 'out');
var express = require('express');
app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8000);
console.log('Server is running on port 8000.');

btn.watch(function(err,state){
	if(state==1){
	console.log('1>');
	led.writeSync(1);
	app.use(function(req,res,next){
		console.log('%s &s',req.method, req.url);
		res.write('<b>Clicking</b>');
		});

	}

	else{
	console.log('0>');
	led.writeSync(0);
	}

});

app.post("/turnon",function(req,res){
	console.log("turn on");
	led.writeSync(1);
	res.send("Message from RC : ON");
	res.redirect('back');
});

app.post("/turnoff",function(req,res){
	console.log("turn off");
	led.writeSync(0);
	res.send("Message from RC : OFF");
	res.redirect('back');
});

