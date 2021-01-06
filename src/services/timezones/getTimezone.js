const { GeneralError } = require("../../utils/generalError");
const timezonesRepository = require("../../repositories/timezones");

const { dateTimeToLocale } = require("../../utils/dateTimeToLocale");

/**
 * Get the timezone that matches with the name param and return it.
 * @param {string} [name] - Name of the timezone to get
 * @returns {object} - A timezone object with date and time
 * @throws Will throw an error if exists any problem trying to get the timezone
 *
 */
const getTimezone = async (name) => {
  try {
    const timezone = await timezonesRepository.findOne({ name: name });
    if (timezone) {
      const localeDateTime = await dateTimeToLocale(timezone.name);
      return { ...timezone, ...localeDateTime };
    } else {
      return null;
    }
  } catch (error) {
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { getTimezone };
