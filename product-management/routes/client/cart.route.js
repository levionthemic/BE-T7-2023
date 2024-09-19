const express = require("express");
const controller = require("../../controllers/client/cart.controller")

const routes = express.Router();

routes.get("/", controller.index);

routes.post("/add/:productId", controller.addPost);

routes.get("/delete/:productId", controller.delete);

routes.get("/update/:productId/:quantity", controller.update);

module.exports = routes;