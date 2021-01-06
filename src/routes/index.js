const express = require("express");
const router = express.Router();

const timezonesRouter = require("./timezones.routes");

router.get("/", (req, res) => {
  res.send("Server Challenge - API TimeZones - Esteban Ruiz de Galarreta");
});

router.use("/timezones", timezonesRouter); //Router for resource Timezones

router.get("*", function (req, res) {
  res.status(404).send("Page not found");
});

module.exports = router;
