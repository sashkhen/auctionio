const mongoose = require('mongoose');
const Auction = mongoose.model('Auction');

exports.getItems = async (req, res) => {
  const auctions = await Auction.find().populate('assets');
  res.json({ auctions });
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  const auction = await Auction.findById(id).populate('assets');
  res.json({ auction });
};

exports.createItem = async (req, res) => {
  const auction = await (new Auction(req.body)).save();
  res.json({ auction });
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const auction = await Auction.findByIdAndUpdate(
    id,
    req.body,
  {
    new: true,
    runValidators: true,
  }).populate('assets').exec();
  res.json({ auction });
};
