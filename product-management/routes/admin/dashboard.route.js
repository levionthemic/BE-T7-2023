const express = require("express");
const controller = require("../../controllers/admin/dashboard.controller")

const routes = express.Router();

routes.get("/", controller.dashboard);

module.exports = routes;