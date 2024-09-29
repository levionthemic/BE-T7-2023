const express = require("express");

const database = require("./config/database");
require("dotenv").config();

const bodyParser = require("body-parser");

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

database.connect();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes Version 1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
