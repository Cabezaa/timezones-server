const { MongoClient } = require("mongodb");
const config = require("../config");

class Connection {
  static async connectMongo() {
    //If it's already connected, we return it.
    if (this.db) return this.db;
    //Else, we make a new connection
    try {
      const client = await MongoClient.connect(this.url, this.options);
      const db = client.db(this.dbName);
      this.db = db;

      //Check if the timezones collections is created
      this.db
        .listCollections({ name: "timezones" })
        .next(async function (err, collinfo) {
          if (err) {
            throw new Error(
              "Error when trying to list the collection timezones of the DB"
            );
          }
          if (collinfo) {
            // The collection exists
            console.log("The collection timezones already exists");
          } else {
            console.log("Creating the collection timezones...");
            await db.createCollection("timezones");
          }
        });
    } catch (error) {
      console.error(error);
      throw new Error("Error when trying to connect with DB");
    }
    return this.db;
  }
}

Connection.db = null;
Connection.url = `mongodb://${
  config.enviroment === "production" ? config.mongoContainerName : config.dbUrl
}:${config.dbPort}`;
Connection.dbName = config.dbName;
Connection.options = {
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { Connection };
