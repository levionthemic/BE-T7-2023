const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;  
  }

  let keyword = req.query.keyword;
  if (keyword) {
    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }
  
  const products = await Product.find(find);
  
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  })
};




