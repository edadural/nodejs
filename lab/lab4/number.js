const square = number => number * number


const func = (number) => {
    (number % 2 === 0) ? console.log("sayı çift") : console.log("sayı tek");
}

const isEven = num => num % 2 == 0;

console.log(square(2));
console.log(func(6));
console.log(isEven(2)); // true-false