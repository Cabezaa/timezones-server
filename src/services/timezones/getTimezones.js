const worldtimeAPI = require("../../utils/worldtimeApi.instance");
require("../../utils/axiosRetry.config");
const { GeneralError } = require("../../utils/generalError");
const timezonesRepository = require("../../repositories/timezones");
const { timezoneToDateAndTime } = require("../../utils/timezoneToDateAndTime");

/**
 * Get the timezones from the database. If the collection is empty, call to the worldtime api to fill the collection.
 * @returns {Array} - A array of timezones
 * @throws Will throw an error if exists any problem trying to get the timezones
 *
 */
const getTimezones = async () => {
  try {
    //First we check locally if have the timezones
    let timezones = await timezonesRepository.findAll();
    if (timezones.length === 0) {
      //We need to fetch the timezones from the API and save it in the database.
      const timezonesNames = await fetchTimezonesFromAPI();
      timezones = timezonesNames.map((timezone) => {
        return {
          name: timezone,
          show: false,
        };
      });
      const insertedTimezones = await timezonesRepository.insertMany(timezones);
      timezones = insertedTimezones;
    }

    //date and time are added for each timezone
    const timezonesWithDateTime = timezones.map((timezone) => {
      const localeDateTime = timezoneToDateAndTime(timezone.name);
      return { ...timezone, ...localeDateTime };
    });
    return timezonesWithDateTime;
  } catch (error) {
    if (error instanceof GeneralError) {
      //case when the error is throw by the fetchTimezonesFromApi function or by the DB abstraction
      throw error;
    } else {
      throw new GeneralError("Internal Server Error", 500);
    }
  }
};

/**
 * Function to get the timezones list from the Worldtime API.
 * @returns {Array} - A array of timezones names
 * @throws Will throw an error if exists any problem in the conecttion with the Worldtime API
 */
const fetchTimezonesFromAPI = async () => {
  try {
    let response = await worldtimeAPI.get(`/timezones`);
    return response.data;
  } catch (error) {
    throw new GeneralError("Error in the call to the WorldTime API", 504);
  }
};

module.exports = { getTimezones };
