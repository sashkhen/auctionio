const mongoose = require('mongoose');
const Auction = mongoose.model('Auction');

exports.lockAssets = (id) => {
  Auction.findById(id).populate({
    path: 'assets',
    match: { status: 'AVAILABLE' }
  })
  .exec(function (err, { assets }) {
    assets.forEach(item => {
      item.status = 'ACTIVE';
      item.activeAuction = id;
      item.save();
    });
  });
}

exports.unlockAssets = (id) => {
  Auction.findById(id).populate({
    path: 'assets',
    match: { status: 'ACTIVE' }
  })
  .exec(function (err, { assets }) {
    assets.forEach(item => {
      item.status = 'AVAILABLE';
      // item.activeAuction = null;
      item.save();
    });
  });
}

exports.sellAssets = (id) => {
  Auction.findById(id).populate({
    path: 'assets',
    match: { status: 'ACTIVE' }
  })
  .exec(function (err, { assets }) {
    assets.forEach(item => {
      item.status = 'SOLD';
      item.save();
    });
  });
}

exports.getItems = async (req, res) => {
  const auctions = await Auction.find().populate({
    path: 'assets',
    // match: {$or: [
    //   { status: 'AVAILABLE' },
    //   { status: 'ACTIVE' },
    // ]}
  });
  res.json({ auctions });
};

exports.getItem = async (req, res) => {
  const { id } = req.params;

  const auction = await Auction.findById(id).populate({
    path: 'assets',
    // match: {$or: [
    //   { status: 'AVAILABLE' },
    //   { status: 'ACTIVE' },
    // ]}
  });
  res.json({ auction });
};

exports.createItem = async (req, res) => {
  const { schedule } = req.scheduler;
  const auction = await (new Auction(req.body)).save();

  schedule([auction]);
  res.json({ auction });
};

exports.updateItem = async (req, res) => {
  const { schedule } = req.scheduler;
  const { id } = req.params;
  const auction = await Auction.findByIdAndUpdate(
    id,
    req.body,
  {
    new: true,
    runValidators: true,
  }).populate({
    path: 'assets',
    // match: {$or: [
    //   { status: 'AVAILABLE' },
    //   { status: 'ACTIVE' },
    // ]}
  }).exec();

  schedule([auction]);
  res.json({ auction });
};
