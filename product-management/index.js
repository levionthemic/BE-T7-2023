const express = require("express");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(methodOverride("_method"));

// App Local Variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;


// Routes
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
routeClient(app);
routeAdmin(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
