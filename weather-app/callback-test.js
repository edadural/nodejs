// setTimeout(() => {
//     console.log("2 saniye time out");
// }, 2000);

// const names = ["Ali", "Berk", "Canan"]
// const shortNames = names.filter((name) => {
//     return name.length <= 4
// })

// ORNEK 1
// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         callback(data)
//     }, 2000);
// }

// geocode("Bursa", (data) => {
//     console.log(data);
// })


// ORNEK 2
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum);
})