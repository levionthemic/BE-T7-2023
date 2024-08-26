const Product = require("../../model/products.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({

  });

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed();
    return item;
  })
  // console.log(products);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProducts
  });
};
