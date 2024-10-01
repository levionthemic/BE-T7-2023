import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database";
database.connect();

import clientRoutes from "./routes/client/index.route";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Static
app.use(express.static("public"));

// Views PUG
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Routes
clientRoutes(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
