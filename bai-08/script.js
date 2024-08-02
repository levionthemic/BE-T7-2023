// console.log(window);
// console.log(window.innerHeight, window.innerWidth);

// const infoUser = {
//   name: "Le Van A",
//   render: () => {
//     console.log("OK");
//   }
// };
// infoUser.render();

// const openTab = () => {
// 	window.open(
// 		"https://28tech.com.vn/", 
// 		"_blank", 
// 		"width=1200, height=600, left=100, top=50"
// 	);
// }

// let tab = null;
// const openTab = () => {
// 	tab = window.open(
// 		"https://28tech.com.vn/", 
// 		"_blank", 
// 		"width=1200, height=600, left=100, top=50"
// 	);
// }

// const closeTab = () => {
// 	tab.close();
// }

// console.log(screen.width, screen.height);

// const reloadPage = () => {
// 	location.reload();
// }

// console.log(history);

// console.log(navigator);

// Tạo cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// const fullName = "Nam";
// console.log(fullName);
// setCookie("fullName", fullName, 3);

// Lấy giá trị cookie
var giatri = document.cookie
console.log(giatri)
var fullName = giatri.split("; ")[0].split("=")[1];
console.log(fullName);

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
console.log(getCookie("phone"));
//document.cookie = "phone=0123";
console.log(getCookie("phone"));

function deleteCookie(cname) {
  document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};



