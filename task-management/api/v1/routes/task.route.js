const express = require("express");

const Task = require("../models/task.model");

const controller = require("../controllers/task.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post("/create", controller.create);

module.exports = router;