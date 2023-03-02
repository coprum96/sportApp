const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});
 
io.on('connection', function(socket){
    console.log('Client connection received');
});