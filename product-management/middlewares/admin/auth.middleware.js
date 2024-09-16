const systemConfig = require("../../config/system");

const Account = require("../../model/account.model");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({ token: token });
    if (user) {
      console.log(token);
      next();
    } else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
  }
};
