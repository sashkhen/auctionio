const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Types = Object.freeze({
  art: 'ART',
  furniture: 'FURNITURE',
  other: 'OTHER',
});

const Asset = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name!',
  },
  type: {
    type: String,
    enum: Types,
    required: 'Please select a type!',
  },
  picture: String,
  status: {
    type: String,
    default: 'AVAILABLE'
  },
});

module.exports = mongoose.model('Asset', Asset);
