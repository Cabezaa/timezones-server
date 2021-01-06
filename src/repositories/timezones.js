const { Connection } = require("../db/mongo.instance");
const { GeneralError } = require("../utils/generalError");

const getTimezonesCollection = () => {
  const collectionTimezones = Connection.db.collection("timezones");
  return collectionTimezones;
};

/**
 * Find all timezones from the DB
 * @returns {Array} - A array of timezones
 * @throws Will throw an error if exists any problem with the DB
 *
 */
const findAll = async () => {
  try {
    const collectionTimezones = getTimezonesCollection();
    const allTimezones = await collectionTimezones.find().toArray();
    return allTimezones;
  } catch (error) {
    console.error("Error in findAll timezones from DB");
    console.error(error);
    throw new GeneralError("Internal Server Error", 500);
  }
};

/**
 * Find one timezone from the DB
 * @param {object} [filters] - The filters for the find
 * @returns {object} - The timezone searched. If it not exist, return null
 * @throws Will throw an error if exists any problem with the DB
 *
 */
const findOne = async (filters) => {
  try {
    const collectionTimezones = getTimezonesCollection();
    const timezone = await collectionTimezones.findOne(filters);
    return timezone;
  } catch (error) {
    console.error("Error in findOne timezone from DB");
    console.error(error);
    throw new GeneralError("Internal Server Error", 500);
  }
};

/**
 * Insert a Array of Timezones to the DB
 * @param {Array} [timezones] - Array of timezones
 * @returns {Array} - A array of timezones with _id
 * @throws Will throw an error if exists any problem with the DB
 *
 */
const insertMany = async (timezones) => {
  try {
    const collectionTimezones = getTimezonesCollection();
    const insertResult = await collectionTimezones.insertMany(timezones);
    //to return the inserted objects (_id,name,show)
    const insertedObjects = insertResult.ops;
    return insertedObjects;
  } catch (error) {
    console.error("Error when insert the timezones to the DB");
    console.error(error);
    throw new GeneralError("Internal Server Error", 500);
  }
};

/**
 * Find a timezone and update it
 * @param {object} [filters] - The filters for the find
 * @param {object} [newObject] - The object that will replace the found items
 * @returns {object} - The new timezone object
 * @throws Will throw an error if exists any problem with the DB
 *
 */
const findOneAndUpdate = async (filters, newObject) => {
  try {
    const collectionTimezones = getTimezonesCollection();
    const result = await collectionTimezones.findOneAndUpdate(
      filters,
      {
        $set: newObject,
      },
      { returnOriginal: false } //we want the new object
    );

    const { value: updatedTimezone } = result; //If its updated, returns the new object. If there no exist the target, returns null
    return updatedTimezone;
  } catch (error) {
    console.error("Error in the findOneAndUpdate of timezones repository");
    console.error(error);
    throw new GeneralError("Internal Server Error", 500);
  }
};

module.exports = { findAll, findOne, insertMany, findOneAndUpdate };
