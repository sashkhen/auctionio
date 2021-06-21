const express = require('express');
const { catchErrors } = require('../utils/errorHandlers');
const auctionController = require('../controllers/auction');
const assetController = require('../controllers/asset');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

router.get('/auctions', catchErrors(auctionController.getItems));
router.post('/auction', catchErrors(auctionController.createItem));
router.get('/auction/:id', catchErrors(auctionController.getItem));
router.post('/auction/:id', catchErrors(auctionController.updateItem));

router.get('/assets', catchErrors(assetController.getItems));
router.post('/asset', catchErrors(assetController.createItem));
router.get('/asset/:id', catchErrors(assetController.getItem));
router.post('/asset/:id', catchErrors(assetController.updateItem));

module.exports = router;
