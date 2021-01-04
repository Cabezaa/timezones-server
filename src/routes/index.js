const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Challenge - API TimeZones - Esteban Ruiz de Galarreta");
});

router.get("*", function (req, res) {
  res.status(404).send("Page not found");
});

module.exports = router;
