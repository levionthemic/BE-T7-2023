const express = require("express");
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

const routes = express.Router();

routes.get("/register", controller.register);
routes.post("/register", validate.registerPost, controller.registerPost);

routes.get("/login", controller.login);
routes.post("/login", validate.loginPost, controller.loginPost);

module.exports = routes;
