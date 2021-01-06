const { GeneralError } = require("../../utils/generalError");
const timezonesRepository = require("../../repositories/timezones");

/**
 * Change the Show attribute of a timezone to true
 * @param {string} [name] - Name of the timezone to change
 * @returns {object} - A timezone object
 * @throws Will throw an error if exists any problem trying to update the timezone
 *
 */
const putTimezone = async (name) => {
  try {
    const updatedTimezone = await timezonesRepository.findOneAndUpdate(
      { name: name }, //Filters
      { show: true } //Property to be changed
    );
    return updatedTimezone;
  } catch (error) {
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { putTimezone };
