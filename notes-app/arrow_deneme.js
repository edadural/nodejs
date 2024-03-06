
const myEvent = {
    name: "xx bebek doğum günü partisi",
    guestList: ['Eda', 'Esra', 'Asaf'],
    printGuestList() {
        console.log(this.name + " için katılımcı listesi")
        
        this.guestList.forEach((guest) => { // bu komut sayesinde array içindeki hepsi tek tek çalışcak
            console.log(guest + ', ' + this.name + 'ne katılıyor.');
        })
    }
}

myEvent.printGuestList()



// const square = function (x) {
//     return x * x
// }

// Arrow function - JS ES6 feature
// const square = (x) => x * x
// console.log(square(4))

// const myEvent = {
//     name: "xx bebek doğum günü partisi",
//     printGuestList: function () {
//         console.log(this.name + "için katılımcı listesi")
//     }
// }

// myEvent.printGuestList()