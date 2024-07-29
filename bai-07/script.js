// 1.2. Các loại hàm (các cách viết hàm)

  // Declaration function (Hàm định nghĩa): có tính hoisting, có đối tượng arguments
  // var a = tong(10, 20, 30, 40, 50);
  // console.log(a);
  // function tong() {
  //     let tong = 0;
  //     for (const item of arguments) {
  //         tong += item;
  //     }
  //     return tong;
  // };

  // Expression function (Hàm biểu thức): ko có tính hoisting, có   đối tượng arguments
  var tong1 = function () {
    let tong = 0;
    for (const item of arguments) {
      tong += item;
    }
    return tong;
  };
  var a = tong1(10, 20, 30, 40, 50);
  console.log(a);
