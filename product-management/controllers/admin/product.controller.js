const Product = require("../../model/products.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active"
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];
  if (req.query.status) {
    filterStatus.map(status => {
      if (status.status == req.query.status) {
        status.class = "active";
      } else {
        status.class = "";
      }
      return status;
    });
  } else {
    filterStatus[0].class = "active";
  }

  let find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;  
  }
  
  const products = await Product.find(find);
  
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus
  })
};




