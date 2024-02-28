const fs = require('fs')

const book = {
    title: "Kitap başlığım",
    author: "Kitabın yazarı",
}

const bookJSON = JSON.stringify(book)
fs.writeFileSync('denemeJson', bookJSON)

const dataBuffer = fs.readFileSync('denemeJson')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data);