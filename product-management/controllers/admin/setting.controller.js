const SettingGeneral = require("../../model/setting-general.model");

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});

  res.render("admin/pages/settings/general.pug", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if (!settingGeneral) {
    const record = new SettingGeneral(req.body);
    await record.save();
  } else {
    await SettingGeneral.updateOne({ _id: settingGeneral.id }, req.body);
  }

  req.flash("success", "Cập nhật thành công!");
  res.redirect("back");
};
