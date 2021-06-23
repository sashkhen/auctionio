const mongoose = require('mongoose');
const Auction = mongoose.model('Auction');

module.exports = async function(schedule) {
  const auctions = await Auction.find();

  schedule(auctions);
};
