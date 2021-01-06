const { Connection } = require("../../db/mongo.instance");
const { GeneralError } = require("../../utils/generalError");

/**
 * Soft delete a Timezone - Changes the Show attribute to false
 * @param {string} [name] - Name of the timezone to change
 * @returns {object} - A timezone object
 * @throws Will throw an error if exists any problem trying to delete the timezone
 *
 */
const deleteTimezone = async (name) => {
  try {
    const collectionTimezones = Connection.db.collection("timezones");
    const result = await collectionTimezones.findOneAndUpdate(
      { name: name },
      { $set: { show: false } },
      { returnOriginal: false } //we want the new object
    );
    const { value } = result; //If its updated, returns the new object. If there is no timezone, returns null
    return value;
  } catch (error) {
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { deleteTimezone };
