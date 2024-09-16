const systemConfig = require("../../config/system");

const Account = require("../../model/account.model");
const Role = require("../../model/role.model");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({ token: token }).select("-password");
    if (user) {
      const role = await Role.findOne({ _id: user.role_id }).select("title permissions");
      res.locals.user = user;
      res.locals.role = role;
      next();
    } else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
  }
};
