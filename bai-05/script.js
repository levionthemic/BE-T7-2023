// var button = document.querySelector("button");
// button.onclick = function () {
//   alert("Hello world");
// };

// String
// var myString = `Xin chào! Tôi tên Nam. Tôi năm nay 18 tuổi.`;
// console.log(myString.length)
// console.log(myString.indexOf('Nam'))
// var newString = myString.slice(3, myString.lastIndexOf(' '))
// console.log(newString);

// console.log(myString.replace('Tôi', 'Minh')) // Thay thế chuỗi tìm thấy đầu tiên
// console.log(myString.replace(/Tôi/g, 'Minh')) // Thay thế tất cả chuỗi tìm thấy

// console.log(myString.toUpperCase())

// Number
// var a = 10;
// var b = "Test";
// var result = a / b;
// console.log(result)
// console.log(typeof(result))
// console.log(isNaN(result))
// console.log(result.toString())

// var a = 12.3456;
// console.log(a.toFixed(1))

// Array
var list = ["HTML", "CSS3", "Javascript"]
console.log(list.toString())
console.log(list.join("-/-"))

console.log(list.pop(), list)
console.log(list.push('ReactJS', 'Bootstrap 4'), list)

console.log(list.shift(), list)
console.log(list.unshift("Bootstrap 4", "ReactJS"), list)

console.log(list.splice(2, 0, "Bootstrap 4", "ReactJS"), list)
console.log(list.splice(2, 1, "ReactJS"), list)

console.log(list.concat(["ReactJS", "Bootstrap 4"]))

console.log(list.slice(1, 8))