// [GET] /client/
module.exports.index = async (req, res) => {
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    layoutProductsCategory: res.locals.layoutProductsCategory
  });
};
