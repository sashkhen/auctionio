const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const Auction = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name!',
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now,
  },
  assets: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  }],
  start: {
    type: Date,
    required: 'Please enter a start date!',
  },
  end: {
    type: Date,
    required: 'Please enter a start date!',
  },
});

Auction.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next();
  }

  this.slug = slug(this.name);

  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegExp });

  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model('Auction', Auction);
