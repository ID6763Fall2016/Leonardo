var express   =     require("express");
var app       =     express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log("user connected to socket");

    socket.on('messageFromClientToServer', function(data){
        console.log(data);
    });

    var sendRandomNumbers = setInterval( function(){
        var averageValue = Math.random() * 6+40;
        var currentValue = averageValue-(Math.random()-0.5)*30;
        var data = [averageValue,currentValue];
        console.log(data);
        socket.emit('messageFromServerToClient', data);
    },300);

    socket.on('disconnect', function(){
        console.log("user disconnected from socket");
        clearInterval(sendRandomNumbers);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});