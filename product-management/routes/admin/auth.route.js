const express = require("express");
const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");


const routes = express.Router();

routes.get("/login", controller.login);
routes.post("/login", validate.loginPost, controller.loginPost);

module.exports = routes;