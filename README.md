# Timezones Server
A small REST API of Timezones. 

# Table of Contents
1. [Technologies](#technologies)
2. [Setup](#setup)
3. [Testing](#testing)
4. [Docker](#docker)
5. [Documentation](#documentation)

## Technologies
This server is created with:
* NodeJS: 14.15.3
* [ExpressJS](https://github.com/expressjs/express): 4.17
* [Cors](https://github.com/expressjs/cors): 2.8.5
* [MongoDB](https://github.com/mongodb/node-mongodb-native): 3.6.3
* [Axios](https://github.com/axios/axios): 0.21.1
* [DotEnv](https://github.com/motdotla/dotenv): 8.2.0
* [Morgan](https://github.com/expressjs/morgan): 1.10.0


## Setup
Follow the next steps to run the server in your local enviroment:

### Prerequisites
You need to have installed the NodeJS Version 14.15.3. You can easily install it with nvm.

```bash
nvm install 14.15.3
```

Then, you need to set as the active version of node:

```bash
nvm use 14.15.3
```

### Clone the repository

```bash
git clone https://github.com/Cabezaa/timezones-server.git
```

### Install dependencies

```bash
cd timezones-server
npm install
```

### Information about the .env

It is not recommended to have the .env file committed in the repository. In this case, it was done in that way just to make it easier to clone and test the server.

Information in the ENV:
```
PORT ==> The port where the server will run. 3005 as default.
DB_URL ==> MongoDB URL. Localhost as default.
DB_PORT ==> MongoDB Port. 27017 as default.
DB_NAME ==> The name  of the DB. 'timezones' as default.

WORLDTIMEAPI_URL ==> The World Time API URL to fetch the data. 'http://worldtimeapi.org/api' as default.

ALLOWED_ORIGINS ==> The URL of the Client APP to set CORS Options. 'http://localhost:3000' as default.

MONGO_CONTAINER_NAME ==> The name of the mongo container for connect in 'production'. 'mongo' as default.
```

### Start the server in local
The project has installed [Nodemon](https://github.com/remy/nodemon) for dev environment. You can run the server with nodemom with:

```bash
npm start
```
## Testing

The project has a few test cases for the API endpoints. They are located in the `test/` folder.

The test cases was made with [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai). Also i used [Chai-http](https://github.com/chaijs/chai-http) to test the API.

To run the test run the next command:

```bash
npm run test
```

It will call `Mocha` with a 30000ms of timeout.

**Important:** The test suite will create a new database in the same connection, but with another name (`timezones_test`).

## Docker

The application is ready to run in docker containers. In this case, we need a container for the node server and another for the mongodb. So i created a docker-compose file to create and run both:

### Build the containers:

```bash
docker-compose build
```

### Run the containers:

```bash
docker-compose up -d
```

### If you want to stop both containers at the same time:

```bash
docker-compose down
```

**Important:** To make the nodejs container wait until the mongodb container is up **and ready** i used a sh script called [wait-for-it.sh](https://github.com/vishnubob/wait-for-it).


In the case that you only want to build and run the server container (and use a external or preexisting mongodb system) follow the next steps:
### Build the image

```bash
docker build -t timezones-server:latest .
```

### Running the image

```bash
docker run --name timezones-server -p 3005:3005 -d timezones-server:latest
```

## Documentation

In this section, i will describe the available endpoints:

### Timezones

#### Endpoint

`GET /timezones/`

To get the full list of Timezones available. It will hit the WorldTime API the 1st. time (in other case, will use local cache)

#### Parameters

No parameters

#### Response

**Status 200:** An array of timezones objects:

    [{
        "_id": "string",
        "name": "string",
        "show": boolean,
        "date": "string",
        "time": "string"
    }]

**Status 504:** A error object. This happens when the WorldTime API is down or busy.


#### Endpoint

`GET /timezones/:name`

It will return a specific timezone with his date and time in string format.

#### Parameters

    * name - "string" - the name of the timezone to get

#### Response

**Status 200:** A timezone object with date and time:

    {
        "_id": "string",
        "name": "string",
        "show": boolean,
        "date": "string",
        "time": "string"
    }


#### Endpoint

`PUT /timezones/:name`

It will update the `show` attribute of a timezone and set it in `true`.


#### Parameters

    * name - "string" - the name of the timezone to update the 'show' property to `true`

#### Response

**Status 200:** A timezone object:

    {
        "_id": "string",
        "name": "string",
        "show": boolean,
    }


#### Endpoint

`DELETE /timezones/:name`

It will work as a "Soft Delete", because it will update the `show` attribute of a timezone and set it in `false`.


#### Parameters

    * name - "string" - the name of the timezone to update the 'show' property to `false`

#### Response

**Status 200:** A timezone object:

    {
        "_id": "string",
        "name": "string",
        "show": boolean,
    }
