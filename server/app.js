const express = require('express');
const http = require('http');
const sio = require('socket.io');

const routes = require('./routes');
const realtime = require('./realtime');
const jobs = require('./jobs');

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = sio(server, {
  cors: {
    origin: ['http://192.168.1.191:3000', 'http://localhost:3000'],
    // methods: ['GET', 'POST']
  }
});

routes(app, io);
realtime(io);
jobs(io);

server.listen(port, () => console.log(`Listening on port ${port}`));
