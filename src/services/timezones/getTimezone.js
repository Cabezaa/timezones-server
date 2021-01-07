const worldtimeAPI = require("../../utils/worldtimeApi.instance");
require("../../utils/axiosRetry.config");
const { GeneralError } = require("../../utils/generalError");
const timezonesRepository = require("../../repositories/timezones");
const { timezoneToDateAndTime } = require("../../utils/timezoneToDateAndTime");

/**
 * Get the timezone that matches with the name param and return it.
 * @param {string} [name] - Name of the timezone to get
 * @returns {object} - A timezone object with date and time
 * @throws Will throw an error if exists any problem trying to get the timezone
 *
 */
const getTimezone = async (name) => {
  try {
    let timezone = await timezonesRepository.findOne({ name: name });
    if (!timezone) {
      //If the timezone isn't present in the db we fetch from the API
      //If the timezone doesn't exists, it will throw a 404 error.
      const remoteTimezone = await fetchTimezoneFromAPI(name);
      timezone = { name: remoteTimezone.timezone, show: false };
    }
    const localeDateTime = timezoneToDateAndTime(timezone.name);
    return { ...timezone, ...localeDateTime };
  } catch (error) {
    if (error instanceof GeneralError) {
      //case when the error is throw by the fetchTimezoneFromApi function or by the DB abstraction
      throw error;
    } else {
      throw new GeneralError("Internal Server Error", 500);
    }
  }
};

/**
 * Function to get the timezones list from the Worldtime API.
 * @param {string} [name] - Name of the timezone to get
 * @returns {object} - A timezone json object
 * @throws Will throw an error if exists any problem in the conecttion with the Worldtime API
 */
const fetchTimezoneFromAPI = async (name) => {
  try {
    let response = await worldtimeAPI.get(`/timezone/` + name);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new GeneralError("Timezone Not Found", 404);
    } else {
      throw new GeneralError("Error in the call to the WorldTime API", 504);
    }
  }
};

module.exports = { getTimezone };
