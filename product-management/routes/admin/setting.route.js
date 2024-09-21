const express = require("express");
const controller = require("../../controllers/admin/setting.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const routes = express.Router();
const multer = require("multer");
const upload = multer();

routes.get("/general", controller.general);
routes.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
);

module.exports = routes;
