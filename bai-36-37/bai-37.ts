// 1. Void
const hello = (fullName: string): void => {
  console.log(`Xin chao ${fullName}`);
};

hello("Le Van A");

// 2. Generics
const reverseArray = <T> (array: T[]): T[] => {
  const newArray = array.reverse();
  return newArray;
};
const array = reverseArray([1, 2, 3]);
console.log(array);

// 3. Union Type
interface Product {
  id: string,
  title: string,
  price: number,
  rating: number | string,
  status: "active" | "inactive" | "locked",
};
