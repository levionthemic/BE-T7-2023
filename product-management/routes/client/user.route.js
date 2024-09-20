const express = require("express");
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

const routes = express.Router();

routes.get("/register", controller.register);
routes.post("/register", validate.registerPost, controller.registerPost);

routes.get("/login", controller.login);
routes.post("/login", validate.loginPost, controller.loginPost);

routes.get("/logout", controller.logout);

routes.get("/password/forgot", controller.forgotPassword);
routes.post(
  "/password/forgot",
  validate.forgotPasswordPost,
  controller.forgotPasswordPost
);

routes.get("/password/otp", controller.otpPassword);
routes.post("/password/otp", controller.otpPasswordPost);

module.exports = routes;
