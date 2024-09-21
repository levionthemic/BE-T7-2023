const express = require("express");
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

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

routes.get("/password/reset", controller.resetPassword);
routes.post(
  "/password/reset",
  validate.resetPasswordPost,
  controller.resetPasswordPost
);

routes.get("/info", authMiddleware.requireAuth, controller.info);

module.exports = routes;
