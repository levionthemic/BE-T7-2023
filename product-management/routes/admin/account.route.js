const express = require("express");
const controller = require("../../controllers/admin/account.controller")
const validate = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();
const routes = express.Router();

routes.get("/", controller.index);

routes.get("/create", controller.create);
routes.post(
  "/create", 
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

routes.get("/edit/:id", controller.edit);
routes.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
)


module.exports = routes;