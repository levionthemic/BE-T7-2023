const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [GET] /cart
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

  res.render("client/pages/cart/index.pug", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;

  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const existProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );

  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      { _id: cartId },
      {
        $push: { products: objectCart },
      }
    );
  }

  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
  res.redirect("back");
};

// [GET] /delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      "$pull": { products: { "product_id": productId } }
    }
  );

  req.flash("success", "Đã xoá sản phẩm khỏi giỏ hàng thành công!");
  res.redirect("back");
};
