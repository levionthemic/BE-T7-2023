const express = require("express");
const controller = require("../../controllers/client/search.controller")

const routes = express.Router();

routes.get("/", controller.index);

module.exports = routes;