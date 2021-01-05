const express = require("express");
const cors = require("cors");
require("dotenv").config();

const config = require("./config");
const apiRoutes = require("./routes/index");
const handleErrors = require("./middleware/handleErrors");
const { Connection } = require("./db/mongo.instance");

const app = express();

var corsOptions = {
  origin: config.allowedOrigins,
  optionsSuccessStatus: 200, // For legacy browser support
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//Attach the Router to the App
app.use(apiRoutes);

//Attach the middleware for handle errors
app.use(handleErrors);

module.exports = app.listen(config.port, async () => {
  //Creating the DB when the server starts.
  try {
    await Connection.connectMongo();
    console.log(`Timezone API listening at http://localhost:${config.port}`);
  } catch (error) {
    console.error(error);
    throw new Error("Cannot connect with the database");
  }
});
