const { GeneralError } = require("../utils/generalError");

const { getTimezones } = require("../services/timezones/getTimezones");
const { getTimezone } = require("../services/timezones/getTimezone");
const { putTimezone } = require("../services/timezones/putTimezone");
const { deleteTimezone } = require("../services/timezones/deleteTimezone");

const getTimezonesController = async (req, res, next) => {
  try {
    const timezones = await getTimezones();
    res.status(200).json(timezones);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTimezoneController = async (req, res, next) => {
  const { name } = req.params;

  try {
    const timezone = await getTimezone(name);
    if (timezone) {
      res.status(200).json(timezone);
    } else {
      //It's mean that doesn't exist a timezone with that name
      throw new GeneralError("Timezone does not exists", 404);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putTimezonesController = async (req, res, next) => {
  const { name } = req.params;
  try {
    const timezone = await putTimezone(name);

    if (timezone) {
      res.status(200).json(timezone);
    } else {
      //It's mean that doesn't exist a timezone with that name
      throw new GeneralError("Timezone does not exists", 404);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteTimezonesController = async (req, res, next) => {
  const { name } = req.params;
  try {
    const timezone = await deleteTimezone(name);

    if (timezone) {
      res.status(200).json(timezone);
    } else {
      //It's mean that doesn't exist a timezone with that name
      throw new GeneralError("Timezone does not exists", 404);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getTimezonesController,
  getTimezoneController,
  putTimezonesController,
  deleteTimezonesController,
};
