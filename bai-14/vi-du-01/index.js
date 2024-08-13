const express = require("express"); // Require ~ import package express

// Connect to MongoDB through Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/products-test-be-t7-2023-01");

const Product = mongoose.model("Product", { 
  title: String,
  price: Number,
  thumbnail: String
});

const app = express(); // gọi hàm và tạo biến app
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.static("css"));
app.use(express.static("js"));


app.get("/", (req, res) => {
  console.log("OK")
  res.render("index.pug", {
    title: "Trang chủ",
    message: "Xin chào các bạn",
  });
});

// app.get("/", (req, res) => {
//   console.log("OK");
//   res.send(
//     `
//       <h1>Trang chủ</h1>
//       <p>Tôi là Nam</p>
//       <p>Tôi năm nay 20 tuổi</p>
//       <p>Tôi đã đủ tuổi lấy vợ</p>
//     `
//   );
// });

app.get("/products", async (req, res) => {
  const products = await Product.find({})
  console.log(products);
  res.render("product.pug", {
    title: "Trang sản phẩm",
    products: products
  })
});

// app.get("/blog", (req, res) => {
//   res.send("<h1>Blog</h1>");
// });

app.get("/contact", (req, res) => {
  res.render("contact.pug", {
    title: "Trang liên hệ",
    message: "Xin chào các bạn",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
