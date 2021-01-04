const axios = require("axios");
const config = require("../config");

module.exports = axios.create({
  baseURL: config.worldtimeAPI,
  timeout: 20000,
});
