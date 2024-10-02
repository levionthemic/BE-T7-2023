import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database";
database.connect();

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";
import bodyParser from "body-parser";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Static
app.use(express.static("public"));

// Views PUG
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
