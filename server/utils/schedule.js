const { CronJob } = require('cron');

const createJob = (date, callback) => {
  try {
    return new CronJob(date, callback)
  } catch (err) {
    console.log('cron error:', { err });
  }

  return null;
};

exports.createJob = createJob;


