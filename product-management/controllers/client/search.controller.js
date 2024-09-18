const Product = require("../../model/products.model");
const searchHelper = require("../../helpers/search");
const productHelper = require("../../helpers/product");

// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  let newProducts = [];

  if (keyword) {
    const objectSearch = searchHelper(req.query);
    const products = await Product.find({
      title: objectSearch.regex,
      deleted: false,
      status: "active",
    });
    newProducts = productHelper.priceNewProducts(products);
  }

  res.render("client/pages/search/index.pug", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProducts,
  });
};
