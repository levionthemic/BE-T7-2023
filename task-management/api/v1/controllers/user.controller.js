const md5 = require("md5");

const User = require("../models/user.model");

// [GET] /api/v1/tasks
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!",
    });
    return;
  }

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Tạo tài khoản thành công!",
    token: token
  });
};
