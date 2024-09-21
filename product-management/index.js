const express = require("express");
require("dotenv").config();

const path = require("path");

const database = require("./config/database");
database.connect();

const methodOverride = require("method-override");

const bodyParser = require("body-parser");

const moment = require("moment");

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// App Local Variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Routes
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
routeClient(app);
routeAdmin(app);

app.get("*", (req, res) => {
  res.render("client/pages/errors/404.pug", {
    pageTitle: "404 NOT FOUND",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
