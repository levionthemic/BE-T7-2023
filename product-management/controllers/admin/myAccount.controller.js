const Account = require("../../model/account.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");

// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "Thông tin cá nhân",
  });
};

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    const emailExist = await Account.findOne({
      _id: { $ne: res.locals.user.id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
    } else {
      await Account.updateOne({ _id: res.locals.user.id }, req.body);
      req.flash("success", "Cập nhật thành công!");
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("back");
};