const { getTimezones } = require("../services/timezones/getTimezones");
const { getTimezone } = require("../services/timezones/getTimezone");
const { putTimezone } = require("../services/timezones/putTimezone");
const { deleteTimezone } = require("../services/timezones/deleteTimezone");

const getTimezonesController = async (req, res) => {
  try {
    const timezones = await getTimezones();
    res.status(200).json(timezones);
  } catch (error) {
    console.error("Error geting the timezones");
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTimezoneController = async (req, res) => {
  const { name } = req.params;

  try {
    const timezone = await getTimezone(name);
    console.log(timezone);
    res.status(200).json(timezone);
  } catch (error) {
    console.error("Error getting the timezone");
    console.error(error);
    res.status(500).send(error.message);
  }
};

const putTimezonesController = async (req, res) => {
  const { name } = req.params;
  try {
    const timezone = await putTimezone(name);

    if (timezone) {
      res.status(200).json(timezone);
    } else {
      //It's mean that doesn't exist a timezone with that name
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error in the PUT of a timezone");
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteTimezonesController = async (req, res) => {
  const { name } = req.params;
  try {
    const timezone = await deleteTimezone(name);

    if (timezone) {
      res.status(200).json(timezone);
    } else {
      //It's mean that doesn't exist a timezone with that name
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error in the PUT of a timezone");
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTimezonesController,
  getTimezoneController,
  putTimezonesController,
  deleteTimezonesController,
};
