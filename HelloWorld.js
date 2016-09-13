var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
res.end('Hello World\n');
}).listen(3000,'143.215.99.186');
console.log('Ping!');
