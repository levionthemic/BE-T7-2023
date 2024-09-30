const express = require("express");

const User = require("../models/user.model");

const controller = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);

router.post(
  "/password/reset",
  authMiddleware.requireAuth,
  controller.resetPassword
);

router.get("/detail", authMiddleware.requireAuth, controller.detail);

module.exports = router;
