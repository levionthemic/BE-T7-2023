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

  // Expression function (Hàm biểu thức): ko có tính hoisting, có đối tượng arguments
  // var tong1 = function () {
  //   let tong = 0;
  //   for (const item of arguments) {
  //     tong += item;
  //   }
  //   return tong;
  // };
  // var a = tong1(10, 20, 30, 40, 50);
  // console.log(a);

  // Arrow function (Hàm mũi tên): ko có tính hoisting, ko có đối tượng arguments
  // var tong2 = (...arguments) => {
  //   let tong = 0;
  //   for (const item of arguments) {
  //     tong += item;
  //   }
  //   return tong;
  // }
  // var a = tong2(10, 20, 40, 50);
  // console.log(a);

  // Try/catch
  // const a = 10;
  // try {
  //   console.log(a);
  // } catch (error) {
  //   console.log(error)
  // }
  // console.log("Continue")

  // Object nâng cao
  // let infoUser = {
  //   name: "Đặng Phương Nam"
  // };
  // console.log(infoUser);
  // infoUser['phone'] = "0123456789";
  // console.log(infoUser);
  // delete infoUser.phone;
  // console.log(infoUser)

  // Array nâng cao
  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // // let sum = 0;
  // // numbers.forEach((item) => {
  // //   sum += item;
  // //   console.log(item);
  // // });
  // // console.log(`sum=${sum}`);

  // numbers.forEach((item, index) => {
  //   numbers[index]++;
  // });
  // console.log(numbers);

  const monHoc = [
    {
      ten: "Toan",
      diem: 8.6
    },
    {
      ten: "Ly",
      diem: 9.2
    },
    {
      ten: "Hoa",
      diem: 8.5
    },
    {
      ten: "Tin",
      diem: 7.8
    }
  ];
  // var res = monHoc.every((item) => {
  //   return item.diem >= 8;
  // });
  // console.log(res);
  // var res = monHoc.some((item) => {
  //   return item.diem >= 8;
  // });
  // console.log(res);
  // var res = monHoc.find((item) => {
  //   return item.diem >= 8;
  // });
  // console.log(res);
  // var res = monHoc.filter((item) => {
  //   return item.diem >= 8;
  // });
  // console.log(res);

  var newArray = monHoc.map((item) => {
    item.phone = "0123457689";
    return item;
  });
  console.log(newArray);

  var sum = monHoc.reduce((total, item, _, array) => {
    total += item.diem / array.length;
    return total;
  }, 0);
  console.log(sum)