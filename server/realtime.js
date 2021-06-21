const { AUCTIONS } = require('./consts');

module.exports = function(io) {
  io.on('connection', (socket) => {
    // io.sockets.on('connection', (socket) => { // ??
    console.log('user connected', socket.id);
    socket.emit('API:auction:all', AUCTIONS);

    // user auctions
    socket.on('user:join', (auctionId) => {
      socket.join(auctionId);
    });
    socket.on('user:leave', (auctionId) => {
      socket.leave(auctionId);
    });

    // user bids
    socket.on('bid:create', (id) => {
      AUCTIONS.find(item => item.id === id).lastBid = socket.id;
      io.to(id).emit('auction:update', { id, user: socket.id });
      // socket.broadcast.emit('chat message', msg); // everyone else
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
