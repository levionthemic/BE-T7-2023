// function test() {
//   let a = 10;
//   console.log(a);
// }

// test();
// console.log(a);

// console.log(a);
// var a;

// const button = document.querySelector("#button");
// button.addEventListener("click", function() {
//   console.log(this);
// });

// button.addEventListener("click", () => {
//   console.log(this);
// });

// var infoUser = {
//   fullName: "Dang Nam",
//   email: "namtest@gmail.com",
//   phone: "01234456778",

//   getFullName: function() {
//     console.log(this.fullName)
//   },

//   cccd: {
//     fullname: "Dang Phuong Nam",
//     getFullName: function() {
//       console.log(this.fullname)
//     }
//   },
// }
// infoUser.cccd.getFullName();

// var objectJS = {
//   fullName: "Dang Phuong Nam",
//   phone: "0123456789",
//   email: "namtest@gmail.com",
// };

var objectJSON = `
  {
    "fullName": "Dang Phuong Nam",
    "phone": "0123456789",
    "email": "namtest@gmail.com"
  }
`;

// Chuyển từ JSON sang JS
const objectJS = JSON.parse(objectJSON);
console.log(objectJS);

// Chuyển từ JS sang JSON
const objectJSON2 = JSON.stringify(objectJS);
console.log(objectJSON2);


