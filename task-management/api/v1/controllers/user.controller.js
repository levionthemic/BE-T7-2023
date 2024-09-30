const md5 = require("md5");

const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
const {
  generateRandomNumber,
  generateRandomString,
} = require("../../../helpers/generate");
const { sendMail } = require("../../../helpers/sendMail");

// [POST] /api/v1/users/register
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
    token: generateRandomString(30),
  });
  await user.save();

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Tạo tài khoản thành công!",
    token: token,
  });
};

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Đăng nhập không thành công!",
    });
    return;
  }
  if (md5(req.body.password) != user.password) {
    res.json({
      code: 400,
      message: "Đăng nhập không thành công!",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token,
  });
};

// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    });
    return;
  }

  const otp = generateRandomNumber(8);

  const timeExpire = 5;

  // Lưu data vào database
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60 * 1000,
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // Gửi OTP qua email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là ${timeExpire} phút. Lưu y không được để lộ mã OTP.
  `;
  sendMail(email, subject, html);

  res.json({
    code: 200,
  });
};

// [POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const { email, otp } = req.body;

  const result = await ForgotPassword.findOne({ email: email, otp: otp });

  if (!result) {
    res.json({
      code: 400,
      message: "OTP không hợp lệ",
    });
    return;
  }

  const user = await User.findOne({ email: email });
  const token = user.token;

  res.cookie("token", token);

  res.json({
    code: 200,
    token: token,
    message: "Xác thực thành công!",
  });
};

// [POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({ token: token });
  if (md5(password) == user.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ",
    });
    return;
  }

  await User.updateOne({ token: token }, { password: md5(password) });

  res.json({
    code: 200,
    message: "Đổi mật khẩu thành công!",
  });
};

// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
  try {
    res.json({
      code: 200,
      message: "Thành công!",
      info: req.user,
    });
  } catch (error) {
    res.json({
      code: 200,
      message: "Thất bại!",
    });
  }
};

// [GET] /api/v1/users/list
module.exports.list = async (req, res) => {
  const users = await User.find({ deleted: false }).select("fullName email");
  res.json({
    code: 200,
    users: users,
    message: "Thành công!",
  });
};
