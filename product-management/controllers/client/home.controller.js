const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  });

  const newProducts = productHelper.priceNewProduct(productsFeatured);

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts
  });
};

