const express = require("express");

const {
  getTimezonesController,
  getTimezoneController,
  putTimezonesController,
  deleteTimezonesController,
} = require("../controllers/timezones.controller");

const timezonesRouter = express.Router();

// GET in /timezones/:name
timezonesRouter.get("/:name", getTimezoneController);

// GET in /timezones/
timezonesRouter.get("/", getTimezonesController);

// PUT in /timezones/:name
timezonesRouter.put("/:name", putTimezonesController);

// DELETE in /timezones/:name
timezonesRouter.delete("/:name", deleteTimezonesController);

module.exports = timezonesRouter;
