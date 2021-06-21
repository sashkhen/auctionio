const { flatten, isInFuture } = require('./index');
const { createJob } = require('./schedule');

const getEvents = (auction) => {
  const { start, end, id } = auction;
  const eventsConfig = { start, end };

  return Object.keys(eventsConfig)
    .map((key) => ({
      key,
      date: eventsConfig[key],
      auctionId: id,
    }));
};

const isValidEvent = (event) => isInFuture(event.date);

const createUpcomingEvents = (auctions, handler) => {
  const createEventJob = (event) => createJob(
    new Date(event.date),
    () => handler(event)
  );

  const jobs = auctions
    .map(getEvents)
    .reduce(flatten, [])
    .filter(isValidEvent)
    .map(createEventJob)
    .filter(Boolean);

  return jobs;
};

exports.createUpcomingEvents = createUpcomingEvents;
