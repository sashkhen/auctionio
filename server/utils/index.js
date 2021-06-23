const moment = require('moment');

// dates
exports.isInFuture = (dateString) => {
  return moment(dateString).diff(moment(new Date())) > 0;
}


