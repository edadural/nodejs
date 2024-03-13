const numbers = [1, 2, 3, 4];

// Regular func
const squareRegular = numbers.map(function (num) {
    return num * num
})

// Arrow func
const squareArrow = numbers.map(num => num * num)

console.log(squareRegular);
console.log(squareArrow);