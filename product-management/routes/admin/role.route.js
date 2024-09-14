const express = require("express");
const controller = require("../../controllers/admin/role.controller")

const routes = express.Router();

routes.get("/", controller.index);

routes.get("/create", controller.create);
routes.post("/create", controller.createPost);

module.exports = routes;