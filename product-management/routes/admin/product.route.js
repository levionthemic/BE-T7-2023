const express = require("express");
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const routes = express.Router();
const multer = require("multer");
const upload = multer();

routes.get("/", controller.index);

routes.patch("/change-status/:status/:id", controller.changeStatus);

routes.patch("/change-multi", controller.changeMulti);

routes.delete("/delete/:id", controller.deleteItem);

routes.get("/create", controller.create);
routes.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

routes.get("/edit/:id", controller.edit);
routes.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

routes.get("/detail/:id", controller.detail);



module.exports = routes;
