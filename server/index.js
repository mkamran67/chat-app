const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server); // instance of socketio that takes in the server

io.on('connection', socket => {
  console.log(`We have a new connection. ${socket}`);

  socket.on('join', ({ name, room }, callback) => {
    console.log(`${name} -- ${room}`);

    // TODO: Will implement properly later
    const error = false;
    if (error) {
      callback({ error: `yea it's a bug` });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User has disconnected`);
  });
});
app.use(router); // middleware

// Port and callback function
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
