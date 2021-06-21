const { getDummyDate } = require('./utils');

exports.AUCTIONS = [
  {
    id: 1111,
    name: 'Auction 1',
    assets: [2221, 2223],
    // start: '2021-06-17T23:01:00.000Z',
    start: getDummyDate(5),
    end: getDummyDate(10),
  },
  {
    id: 1112,
    name: 'Auction 2',
    assets: [2221, 2223],
    start: getDummyDate(-5),
    end: getDummyDate(7),
  },
];

exports.ASSETS = [
  {
    name: 'Asset 1',
    id: 2221,
  },
  {
    name: 'Asset 2',
    id: 2222,
  },
  {
    name: 'Asset 3',
    id: 2223,
  }
];
