const mongoose = require('mongoose');
const { isInFuture } = require('./utils');
const Auction = mongoose.model('Auction');
const { lockAssets, unlockAssets, sellAssets } = require('./controllers/auction');

async function updateAuction(io, { id, key, auction }) {
  io.to(id).emit('auction:update', { event: key, auction });

  if (key === 'start') {
    return lockAssets(auction._id);
  }

  const upToDate = await Auction.findById(auction._id);
  const { value } = upToDate.lastBid;

  if (key === 'end' && value) {
    return sellAssets(auction._id);
  }

  return unlockAssets(auction._id);
}

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('[io]:user:connected', socket.id);

    // user auctions
    socket.on('user:join', (auctionId) => {
      socket.join(auctionId);
      // io.to(auctionId).emit('user:joined');
    });
    socket.on('user:leave', (auctionId) => {
      socket.leave(auctionId);
      // io.to(auctionId).emit('user:left');
    });

    // user bids
    socket.on('bid:create', async ({ id, bid }) => {
      const auction = await Auction.findById(id);
      const isAuctionActive = !isInFuture(auction.start) && isInFuture(auction.end);
      const isBidValid = bid > (auction.lastBid.value || 0);
      const updates = {
        lastBid: {
          userId: socket.id,
          value: bid,
        }
      };

      if (!isAuctionActive) {
        console.log('not active');
        socket.emit('auction:update', { event: 'error', error: 'auction closed' });
        return;
      }

      if (!isBidValid) {
        console.log('not valid');
        socket.emit('auction:update', { event: 'error', auction, error: 'bid invalid' });
        return;
      }

      console.log('active');
      const updated = await Auction.findByIdAndUpdate(
        id,
        updates,
      {
        new: true,
        runValidators: true,
      }).exec();

      io.to(id).emit('auction:update', { event: 'bid', auction: updated });
      // socket.broadcast.emit('chat message', msg); // everyone else
    });

    socket.on('disconnect', () => {
      console.log('[io]:user:disconnected', socket.id);
    });
  });
}

module.exports = {
  initSocket,
  updateAuction,
};
