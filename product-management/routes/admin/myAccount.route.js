const express = require("express");
const controller = require("../../controllers/admin/myAccount.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();

const routes = express.Router();

routes.get("/", controller.index);

routes.get("/edit", controller.edit);
routes.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
);

module.exports = routes;
