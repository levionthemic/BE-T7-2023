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

const tinhToan = (a, b) => {
  const tinhTong = () => {
    return a + b;
  }
  const tinhHieu = () => {
    return a - b;
  }
  const tinhTich = () => {
    return a * b;
  }
  const tinhThuong = () => {
    return a / b;
  }
  return {
    tong: tinhTong,
    hieu: tinhHieu,
    tich: tinhTich,
    thuong: tinhThuong
  }
}

console.log(tinhToan(10, 20).hieu());
