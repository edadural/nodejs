require('./utils')
console.log("Merhaba NodeJS")

// core module
const fs = require('fs')
// dosyanın üzerine yazılır
fs.writeFileSync("notes.txt", "Merhaba dosya")

fs.appendFileSync("notes.txt", "Tekrar merhaba")