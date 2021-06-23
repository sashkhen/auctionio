const express = require('express');
const cors = require('cors');
const http = require('http');
const sio = require('socket.io');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes');
const { initSocket, updateAuction } = require('./realtime');
const tasks = require('./tasks');
const errorHandlers = require('./utils/errorHandlers');
const { auctionScheduler } = require('./utils/auctionScheduler');

const port = process.env.PORT || 4001;
const clientUrls = JSON.parse(process.env.CLIENT_URLS || '');
const app = express();
const server = http.createServer(app);
const io = sio(server, {
  cors: {
    origin: clientUrls,
    // methods: ['GET', 'POST']
  }
});

const scheduler = auctionScheduler(function(payload) {
  updateAuction(io, payload);
  console.log('job done!', payload.id);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
  req.io = io;
  req.scheduler = scheduler;
  next();
});
app.use('/', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validationErrors);

if (app.get('env') === 'development') {
  // prints stack trace
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

initSocket(io);
tasks(scheduler.schedule);

server.listen(port, () => console.log(`Listening on port ${port}`));
