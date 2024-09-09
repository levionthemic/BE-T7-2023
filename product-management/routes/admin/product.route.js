const express = require("express");
const controller = require("../../controllers/admin/product.controller")

const routes = express.Router();

routes.get("/", controller.index);

routes.patch("/change-status/:status/:id", controller.changeStatus)
routes.patch("/change-multi", controller.changeMulti);

routes.delete("/delete/:id", controller.deleteItem);

module.exports = routes;