const express = require("express");
const controller = require("../../controllers/admin/product-category.controller");
const multer = require("multer");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const routes = express.Router();

const upload = multer();

routes.get("/", controller.index);
routes.get("/create", controller.create);
routes.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);



module.exports = routes;
