const express = require('express');
const cors = require('cors');
const http = require('http');
const sio = require('socket.io');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes');
const realtime = require('./realtime');
const jobs = require('./jobs');
const errorHandlers = require('./utils/errorHandlers');

const port = process.env.PORT || 4001;
const clientUrls = JSON.parse(process.env.CLIENT_URLS || '');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validationErrors);

if (app.get('env') === 'development') {
  // prints stack trace
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

const server = http.createServer(app);
const io = sio(server, {
  cors: {
    origin: clientUrls,
    // methods: ['GET', 'POST']
  }
});

realtime(io);
// jobs(io);

server.listen(port, () => console.log(`Listening on port ${port}`));
