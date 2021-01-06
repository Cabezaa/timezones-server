const { GeneralError } = require("./generalError");

/**
 * From a timezone in string, returns the actual local date and time.
 * @param {string} [name] - Name of the timezone to use
 * @returns {object} - A object with date and time
 * @throws Will throw an error if exists any problem trying to convert the date
 *
 */
const dateTimeToLocale = (name) => {
  const datetime = new Date();
  const date = datetime
    ? datetime.toLocaleDateString("en-US", { timeZone: name })
    : "";
  const time = datetime
    ? datetime.toLocaleTimeString("en-US", { timeZone: name })
    : "";
  return { date: date, time: time };
};

module.exports = { dateTimeToLocale };
