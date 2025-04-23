const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('✅ New client connected');

  socket.on('chat message', (msg) => {
    const message = {
      text: msg.text,
      sender: msg.sender,
      timestamp: new Date().toISOString(),
    };
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
