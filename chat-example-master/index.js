var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("user connected to socket");
	
	socket.on('messageFromClientToServer', function(data){
		console.log(data);
	});
	
	var sendRandomNumbers = setInterval( function(){
		var numberData = Math.random() * 100;
		console.log(numberData);
		socket.emit('messageFromServerToClient', numberData);
	},1000);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
