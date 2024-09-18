const express = require("express");
const controller = require("../../controllers/client/cart.controller")

const routes = express.Router();

routes.post("/add/:productId", controller.addPost);

module.exports = routes;