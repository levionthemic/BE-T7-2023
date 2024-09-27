const express = require("express");

const Task = require("../models/task.model");

const controller = require("../controllers/task.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

module.exports = router;