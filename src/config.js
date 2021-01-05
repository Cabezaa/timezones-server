"use strict";

const {
  NODE_ENV,
  PORT,
  DB_URL,
  DB_PORT,
  DB_NAME,
  ALLOWED_ORIGINS,
  WORLDTIMEAPI_URL,
  MONGO_CONTAINER_NAME,
} = process.env;

const config = {
  enviroment: NODE_ENV || "development",
  port: PORT || 3005,
  dbUrl: DB_URL || "localhost",
  dbPort: DB_PORT || 27017,
  dbName: DB_NAME || "timezones",
  allowedOrigins: ALLOWED_ORIGINS || "http://localhost:3000",
  worldtimeAPI: WORLDTIMEAPI_URL,
  mongoContainerName: MONGO_CONTAINER_NAME || "mongo",
};

module.exports = config;
