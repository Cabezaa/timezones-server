const axiosRetry = require('axios-retry');
const worldTimeAPI = require('./worldtimeApi.instance');

module.exports = axiosRetry(worldTimeAPI, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 1000,
});
