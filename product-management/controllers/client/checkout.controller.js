const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const Order = require("../../model/order.model");
const productHelper = require("../../helpers/product");

// [GET] /checkout
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
    cartDetail: cart,
  });
};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;

  const cart = await Cart.findOne({ _id: cartId });

  let products = [];

  for (const item of cart.products) {
    const product = {
      product_id: item.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: item.quantity,
    };

    const productInfo = await Product.findOne({ _id: item.product_id });
    product.price = productInfo.price;
    product.discountPercentage = productInfo.discountPercentage;

    products.push(product);
  }

  const objectOrder = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };

  const order = new Order(objectOrder);
  await order.save();

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: []
    }
  )
  req.flash("success", "Đặt hàng thành công!");
  res.redirect(`/checkout/success/${order.id}`);
};
