const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise; // use ES6 promises

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

mongoose.connection.on('connected', (data) => {
  console.log('DB connected');
});

require('./models/Auction');
require('./models/Asset');

module.exports = {
  // Auction,
};
