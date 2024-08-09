// Local Stoage
// localStorage.setItem("fullName", "Dang Phuong Nam");

// const fullName = localStorage.getItem("fullName");
// const test = document.querySelector(".test");
// test.innerHTML = fullName;

// localStorage.setItem("mode", "bright");

// Change dark mode
// const currentMode = localStorage.getItem("mode");
// const body = document.querySelector("body");
// if (currentMode) {
//   body.classList.toggle(currentMode);
// }

// const button = document.querySelector("#change-mode");
// button.addEventListener("click", () => {
//   const body = document.querySelector("body");
//   body.classList.toggle("dark");

//   const currentMode = localStorage.getItem("mode");

//   if (currentMode) {
//     localStorage.setItem("mode", "");
//   } else {
//     localStorage.setItem("mode", "dark");
//   }
// });
// End Change dark mode


// Closure
// let c = 10;
// const tinhToan = (a, b) => {
//   let c = 20
//   const tinhTong = () => {
//     return a + b + c;
//   }
//   return tinhTong;
// }

// console.log(tinhToan(10, 20)());

// const tinhToan = (a, b) => {
//   const tinhTong = () => {
//     return a + b;
//   }
//   const tinhHieu = () => {
//     return a - b;
//   }
//   const tinhTich = () => {
//     return a * b;
//   }
//   const tinhThuong = () => {
//     return a / b;
//   }
//   return {
//     tong: tinhTong,
//     hieu: tinhHieu,
//     tich: tinhTich,
//     thuong: tinhThuong
//   }
// }

// console.log(tinhToan(10, 20).hieu());

// Default params
// const tong = (a = 0, b = 1) => {
//   return a + b;
// }

// const ketQua = tong(10);
// console.log(ketQua);

// Spread systax
// let listUserDB = [
//   "Le Van A", 
//   "Nguyen Thi B",
//   "Do Van C"
// ]

// let listUserFE = [
//   "Nguyen Van D",
//   "Do Thi E"
// ]

// listUserDB = [...listUserDB, ...listUserFE];
// console.log(listUserDB);

// let infoUserDB = {
//   fullName: "Le Van A",
//   email: "levana@gmail.com"
// }
// const infoUserFE = {
//   phone: "0123546789",
//   age: 18
// }
// infoUserDB = {...infoUserDB, ...infoUserFE, fb: "fb.com"};
// console.log(infoUserDB)

// Rest Params
// const tinhTong = (a, b, ...numbers) => {
//   console.log(numbers)
// }
// tinhTong(10, 20, 30, 40, 50)

// Destructuring
// const array = [1, 2, 3];
// const [a, ...b] = array;
// console.log(a, b);

const infoUser = {
  fullName: "Dang Phuong Nam",
  email: "namtest@gmail.com",
  phone: "0123456789"
}

const { fullName, ...rest } = infoUser;
console.log(fullName);
console.log(rest);