// const congViec1 = () => {
//   console.log("Cong viec 1");
// };

// const congViec2 = (callback) => {
//   callback();
// };

// congViec2(congViec1);

// const loginSuccess = () => {
//   console.log("Dang nhap thanh cong");
// }
// const checkLogin = (data, callback) => {
//   const email = "namtest@gmail.com";
//   const password = "2222";

//   if (data.email === email && data.password === password) {
//     callback();
//   } else {
//     console.log("Dang nhap that bai");
//   }
// }

// let data = {
//   email: "namtest@gmail.com",
//   password: "2222"
// }

// checkLogin(data, loginSuccess);

// var a = 10;

// var promise = new Promise((resolve, reject) => {
//   if (a === undefined) {
//     reject();
//   } else {
//     resolve(a);
//   }
// });

// promise
//   .then((resA) => {
//     console.log(resA);
//     return resA;
//   })
//   .then((resA) => {
//     const resB = resA + 10;
//     console.log(resB);
//     return resB;
//   })
//   .then((resB) => {
//     const resC = resB * 10;
//     console.log(resC);
//   })
//   .catch(() => {
//     console.log("That bai");
//   })
//   .finally(() => {
//     console.log("Luon chay");
//   })

fetch("https://dummyjson.com/products")
  .then((response) => response.json()) // json(): chuyển từ JSON => JS
  .then((data) => {
    console.log(data.products);
    const newArray = data.products.map((item) => {
      return `
        <div class="product-item">
          <img src="${item.thumbnail}">
          <h2>
            ${item.title}
          </h2>
          <div>$${item.price}</div>
        </div>
      `;
    });

    const html = newArray.join("");
    // console.log(html);

    document.querySelector("#product-list").innerHTML = html;
  });

// Fetch API: https://restcountries.com/v2/all
/* TO DO */

// Async / Await
// const fetchApi = async (api) => {
//   const response = await fetch(api);
//   const data = await response.json();
//   return data;
// };

// // fetchApi("https://dummyjson.com/products")
// //   .then((data) => {
// //     console.log(data);
// //   })
// fetchApi("http://localhost:3000/products").then((data) => {
//   console.log(data);
//   const newArray = data.map((item) => {
//     return `
//               <div class="product-item">
//                 <img src="${item.thumbnail}">
//                 <h2>
//                   ${item.title}
//                 </h2>
//                 <div>$${item.price}</div>
//               </div>
//             `;
//   });

//   const html = newArray.join("");
//   console.log(html);

//   document.querySelector("#product-list").innerHTML = html;
// });
