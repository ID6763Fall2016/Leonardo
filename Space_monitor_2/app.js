var express   =     require("express");
var app       =     express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname + '/public'));

var angle=0;
var sinAngle=0;
io.on('connection', function (socket) {
    console.log("user connected to socket");

    socket.on('messageFromClientToServer', function(data){
        console.log(data);
    });



    var sendRandomNumbers = setInterval( function(){

        angle+=5;

        if(angle>=360) angle=0;
        sinAngle=Math.sin(angle*Math.PI/180);


        var averageValue = Math.random() * 6+40;
        var currentValue = 40+sinAngle*20+Math.random()*6;
        var data = [averageValue,currentValue];
        console.log(sinAngle);
        socket.emit('messageFromServerToClient', data);
    },220);

    socket.on('disconnect', function(){
        console.log("user disconnected from socket");
        clearInterval(sendRandomNumbers);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});