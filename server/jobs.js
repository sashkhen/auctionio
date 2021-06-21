const { createUpcomingEvents } = require('./utils/auction');
const { AUCTIONS } = require('./consts');

module.exports = function(io) {
  const jobs = createUpcomingEvents(AUCTIONS, (event) => {
    const { key, auctionId: id } = event;

    console.log('job done!', event);
    io.to(id).emit('auction:update', { id, event: key });
  });

  console.log('JOBS:', jobs.length);
  jobs.forEach(job => job.start());

  return jobs;
}
