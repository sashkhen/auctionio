const mongoose = require('mongoose');
const Asset = mongoose.model('Asset');

exports.getItems = async (req, res) => {
  const assets = await Asset.find();
  res.json({ assets });
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findById(id);
  res.json({ asset });
};

exports.createItem = async (req, res) => {
  const asset = await (new Asset(req.body)).save();
  res.json({ asset });
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findByIdAndUpdate(
    id,
    req.body,
  {
    new: true,
    runValidators: true,
  }).exec();
  res.json({ asset });
};


