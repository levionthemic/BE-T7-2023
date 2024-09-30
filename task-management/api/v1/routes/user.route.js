const express = require("express");

const User = require("../models/user.model");

const controller = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);


module.exports = router;