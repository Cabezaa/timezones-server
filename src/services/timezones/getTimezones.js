const worldtimeAPI = require("../../utils/worldtimeApi.instance");
const { Connection } = require("../../db/mongo.instance");
const { GeneralError } = require("../../utils/generalError");

/**
 * Get the timezones from the database. If the collection is empty, call to the worldtime api to fill the collection.
 * @returns {Array} - A array of timezones
 * @throws Will throw an error if exists any problem trying to get the timezones
 *
 */
const getTimezones = async () => {
  try {
    let timezones = [];
    const collectionTimezones = Connection.db.collection("timezones");
    timezones = await collectionTimezones.find().toArray();

    if (timezones.length === 0) {
      //We need to fetch the timezones from the API and save it in the database.
      timezones = await fetchTimezonesFromAPI();
      timezones = timezones.map((timezone) => {
        return {
          name: timezone,
          show: false,
        };
      });
      const result = await collectionTimezones.insertMany(timezones);
      if (result.ok === 0) {
        console.error("Error when insert the timezones to the DB");
        throw new GeneralError("Error inserting the Timezones", 500);
      }
    }
    return timezones;
  } catch (error) {
    if (error instanceof GeneralError) {
      //case when the error is throw by the fetchTimezonesFromApi function
      throw error;
    } else {
      throw new GeneralError("Internal Server Error", 500);
    }
  }
};

/**
 * Function to get the timezones list from the Worldtime API.
 * @returns {Array} - A array of timezones
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
