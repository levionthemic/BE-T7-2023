const express = require("express");

const Task = require("../../../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({ deleted: false });
  console.log(tasks);
  res.json(tasks);
});

router.get("/detail/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const tasks = await Task.findOne({ _id: id, deleted: false });

    res.json(tasks);
  } catch (error) {
    res.json("Not Found");
  }
});

module.exports = router;