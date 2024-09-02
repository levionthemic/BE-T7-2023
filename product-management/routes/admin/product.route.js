const express = require("express");
const controller = require("../../controllers/admin/product.controller")

const routes = express.Router();

routes.get("/", controller.index);

routes.patch("/change-status/:status/:id", controller.changeStatus)

module.exports = routes;