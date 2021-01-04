const { Connection } = require("../../db/mongo.instance");

const worldtimeAPI = require("../../utils/worldtimeApi.instance");
require("../../utils/axiosRetry.config");

/**
 * Get the timezone that matches with the name param and return it.
 * @param {string} [name] - Name of the timezone to get
 * @returns {object} - A timezone object with date and time
 * @throws Will throw an error if exists any problem trying to get the timezone
 *
 */
const getTimezone = async (name) => {
  try {
    const collectionTimezones = Connection.db.collection("timezones");
    const timezone = await collectionTimezones.findOne({ name: name });
    const { data } = await worldtimeAPI.get(`/timezone/${name}`);
    const datetime = new Date(data.datetime);
    const date = datetime
      ? datetime.toLocaleDateString("en-US", { timeZone: data.timeZone })
      : "";
    const time = datetime
      ? datetime.toLocaleTimeString("en-US", { timeZone: data.timeZone })
      : "";

    return { ...timezone, date: date, time: time };
  } catch (error) {
    console.error("Error getting the timezones");
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = { getTimezone };
