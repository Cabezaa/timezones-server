//We first config a couple of envs to be loaded by mocha and passed to the app
process.env.NODE_ENV = "test";
process.env.WORLDTIMEAPI_URL = "http://worldtimeapi.org/api";

const { Connection } = require("../src/db/mongo.instance");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");
var expect = require("chai").expect;

chai.use(chaiHttp);

describe("Timezones", async () => {
  //we clean the database (timezones collection) first
  before(async () => {
    await Connection.connectMongo();
    const collectionTimezones = Connection.db.collection("timezones");
    const result = await collectionTimezones.deleteMany({});
  });

  describe("/GET timezones", () => {
    it("it should GET a array of timezones", (done) => {
      chai
        .request(server)
        .get("/timezones")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("array");
          done();
        });
    });
  });

  describe("/GET a timezone", () => {
    it("it should GET only the timezone from buenos aires", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Buenos_Aires");
      chai
        .request(server)
        .get("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).haveOwnProperty(
            "name",
            "America/Argentina/Buenos_Aires"
          );
          expect(res.body).haveOwnProperty("date");
          expect(res.body).haveOwnProperty("time");
          expect(res.body).haveOwnProperty("show", false);

          done();
        });
    });

    it("it should return a 204 (timezone Neuquen does not exists)", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Neuquen");
      chai
        .request(server)
        .get("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it("it should return a 204 (bad type param)", (done) => {
      chai
        .request(server)
        .get("/timezones/" + 10000)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe("/PUT timezones", () => {
    it("it should change the show property to true", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Buenos_Aires");
      chai
        .request(server)
        .put("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).haveOwnProperty(
            "name",
            "America/Argentina/Buenos_Aires"
          );
          expect(res.body).haveOwnProperty("show", true);
          done();
        });
    });

    it("it should keep the show property to true", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Buenos_Aires");
      chai
        .request(server)
        .put("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).haveOwnProperty(
            "name",
            "America/Argentina/Buenos_Aires"
          );
          expect(res.body).haveOwnProperty("show", true);
          done();
        });
    });

    it("it should return a 404 (bad url)", (done) => {
      chai
        .request(server)
        .put("/timezones")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("/DELETE timezones", () => {
    it("it should change the show property to false", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Buenos_Aires");
      chai
        .request(server)
        .delete("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).haveOwnProperty(
            "name",
            "America/Argentina/Buenos_Aires"
          );
          expect(res.body).haveOwnProperty("show", false);
          done();
        });
    });

    it("it should keep the show property to false", (done) => {
      const parsedName = encodeURIComponent("America/Argentina/Buenos_Aires");
      chai
        .request(server)
        .delete("/timezones/" + parsedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).haveOwnProperty(
            "name",
            "America/Argentina/Buenos_Aires"
          );
          expect(res.body).haveOwnProperty("show", false);
          done();
        });
    });

    it("it should return a 404 (bad url)", (done) => {
      chai
        .request(server)
        .delete("/timezones")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
