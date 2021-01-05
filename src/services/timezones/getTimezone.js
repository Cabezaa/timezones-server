const { Connection } = require("../../db/mongo.instance");

const worldtimeAPI = require("../../utils/worldtimeApi.instance");
require("../../utils/axiosRetry.config");

const { GeneralError } = require("../../utils/generalError");

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
      ? datetime.toLocaleDateString("en-US", { timeZone: data.timezone })
      : "";
    const time = datetime
      ? datetime.toLocaleTimeString("en-US", { timeZone: data.timezone })
      : "";

    return { ...timezone, date: date, time: time };
  } catch (error) {
    if (error.isAxiosError) {
      //It's means that the error is in the API of WorldTime
      throw new GeneralError(
        "Error in the connection with the Worldtime API - Timeout",
        504
      );
    } else {
      throw new GeneralError("Internal Server Error", 500);
    }
  }
};

module.exports = { getTimezone };
