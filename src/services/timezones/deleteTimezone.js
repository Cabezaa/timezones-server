const { Connection } = require("../../db/mongo.instance");

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
    const { value } = result; //If its updated, returns the new objects. If there no exist the target, returns null
    return value;
  } catch (error) {
    console.error("Error when trying to soft delete a timezone");
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = { deleteTimezone };
