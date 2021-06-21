const moment = require('moment');

// generic
exports.flatten = (acc, item) => {
  return [...acc, ...item];
}

exports.getDummyDate = (offset) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + offset);
  return date.toISOString();
}

// dates
exports.isInFuture = (dateString) => {
  return moment(dateString).diff(moment(new Date())) > -1;
}


