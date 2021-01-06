const { GeneralError } = require("../../utils/generalError");
const timezonesRepository = require("../../repositories/timezones");

/**
 * Soft delete a Timezone - Changes the Show attribute to false
 * @param {string} [name] - Name of the timezone to change
 * @returns {object} - A timezone object
 * @throws Will throw an error if exists any problem trying to delete the timezone
 *
 */
const deleteTimezone = async (name) => {
  try {
    //This is a 'soft delete'
    const deletedTimezone = await timezonesRepository.findOneAndUpdate(
      { name: name },
      { show: false }
    );
    return deletedTimezone;
  } catch (error) {
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { deleteTimezone };
