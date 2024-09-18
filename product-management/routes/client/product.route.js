const express = require("express");
const controller = require("../../controllers/client/products.controller");

const routes = express.Router();

routes.get("/", controller.index);

routes.get("/detail/:slugProduct", controller.detail);

routes.get("/:slugCategory", controller.category);


module.exports = routes;