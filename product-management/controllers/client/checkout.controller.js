const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({ _id: cartId });

  if (cart.products.length) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const product = await Product.findOne({ _id: productId });
      product.priceNew = productHelper.priceNewProduct(product);
      item.productInfo = product;
    }
    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.quantity * item.productInfo.priceNew,
      0
    );
  }

  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Trang thanh toán",
    cartDetail: cart
  });
};
