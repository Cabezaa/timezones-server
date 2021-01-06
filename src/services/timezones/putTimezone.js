const { Connection } = require("../../db/mongo.instance");
const { GeneralError } = require("../../utils/generalError");

/**
 * Change the Show attribute of a timezone to true
 * @param {string} [name] - Name of the timezone to change
 * @returns {object} - A timezone object
 * @throws Will throw an error if exists any problem trying to update the timezone
 *
 */
const putTimezone = async (name) => {
  try {
    const collectionTimezones = Connection.db.collection("timezones");
    const result = await collectionTimezones.findOneAndUpdate(
      { name: name },
      { $set: { show: true } },
      { returnOriginal: false } //we want the new object
    );
    const { value } = result; //If its updated, returns the new objects. If there no exist the target, returns null
    return value;
  } catch (error) {
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { putTimezone };
