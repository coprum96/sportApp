const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); // shorter syntax


server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');
});

const connections = []; // use const instead of global variable

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  connections.push(socket);

  socket.on('disconnect', () => {
    const index = connections.indexOf(socket);
    if (index !== -1) {
      connections.splice(index, 1);
      console.log('Disconnected:', socket.id);
    }
  });

  socket.on('send mess', (data) => {
    io.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
  });
});
