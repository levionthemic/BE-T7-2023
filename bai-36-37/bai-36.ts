// const a: number = 10;
// console.log(a);

// let fullName: string = "Le Van A";
// console.log(fullName);

// Interface
interface User {
  fullName: string;
  age: number;
}
const user: User = {
  fullName: "Le Van A",
  age: 18,
};

// Extends interface
interface Account extends User {
  address: string;
}
const user1: Account = {
  fullName: "Le Van A",
  age: 18,
  address: "abc",
};

// Array
const infoUser: (string | number)[] = ["Le Van A", 18];

// Tuple
let info: [string, number, boolean];
info = ["Le Van A", 18, true];

// Function + default params
const sum = (a: number = 0, b: number = 0): number => {
  return a + b;
};
console.log(sum());

// Enum
enum Status {
  INITIAL = "initial",
  ACTIVE = "active",
  INACTIVE = "inactive"
}

// Any
let a: any = 20;
a = "";


