const user = {
    fullName: "Le Van A",
    age: 18,
};
const user1 = {
    fullName: "Le Van A",
    age: 18,
    address: "abc",
};
const infoUser = ["Le Van A", 18];
let info;
info = ["Le Van A", 18, true];
const sum = (a = 0, b = 0) => {
    return a + b;
};
console.log(sum());
var Status;
(function (Status) {
    Status["INITIAL"] = "initial";
    Status["ACTIVE"] = "active";
    Status["INACTIVE"] = "inactive";
})(Status || (Status = {}));
let a = 20;
a = "";
