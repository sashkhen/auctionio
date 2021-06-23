const { CronTime } = require('cron');
const { createJob } = require('./schedule');
const { isInFuture } = require('./index');

const auctionScheduler = (handler, initialItems = []) => {
  const create = (auction, key) => createJob(
    new Date(auction[key]),
    () => handler({ id: '' + auction._id, key, auction }) // .toHexString()
  );
  const update = (job, date) => job.setTime(new CronTime(new Date(date)));

  const auctions = initialItems
    .filter((item) => isInFuture(item.start) && isInFuture(item.end))
    .reduce((acc, auction) => ({
      ...acc,
      [auction._id]: {
        _id: auction._id,
        start: create(auction, 'start'),
        end: create(auction, 'end'),
      },
    }), {});

  const schedule = function(items = []) {
    items
      .filter((item) => isInFuture(item.start) && isInFuture(item.end))
      .forEach((item) => {
        let existingAuction = auctions[item._id];

        if (existingAuction) {
          // update jobs
          update(existingAuction.start, item.start);
          update(existingAuction.end, item.end);
        } else {
          // create jobs
          existingAuction = {
            _id: item._id,
            start: create(item, 'start'),
            end: create(item, 'end'),
          };

          // save jobs
          auctions[item._id] = existingAuction;
        }

        // start/restart jobs
        existingAuction.start.start();
        existingAuction.end.start();
      });

    console.log({auctions});
    return auctions;
  };

  return {
    auctions,
    schedule,
  };
};

exports.auctionScheduler = auctionScheduler;
