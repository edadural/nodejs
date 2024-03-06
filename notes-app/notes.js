const fs = require('fs') // okuma yapmak için
const chalk = require('chalk')

const addNote = function (title, body) {
    const notes = loadNotes(); // mevcut notlar yüklenir. array

    const dublicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (dublicateNotes.length === 0) { // hiçbir eşleşme sağlanmamışsa yeni not eklenir
        // array sonuna eleman eklmek için
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse("Yeni not eklendi"));
        saveNotes(notes);
    } else {
        console.log(chalk.red.inverse("Bu başlık daha önce alındı. Not eklenemiyor."))
    }

}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title // title'a eşit olmayanları sakla
    })
    if (notes.length > notesToKeep.length) { // saklamak istediğim notların sayısı ile silmek istediğim not sayısından büyük ise
        console.log(chalk.green.inverse("Not silindi")) // yazı rengiyle arka planın tersi renk olması : inverse
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse("Not bulunamadı"))
    }
}

const getNotes = function () {

}

const loadNotes = function () { // dosydan okuma işlemi yapcak
    try {
        // read from file
        const dataBuffer = fs.readFileSync('notes.json')
        // convert to Json format
        const dataJSON = dataBuffer.toString();  // stringe çevir
        // parse the string and return
        return JSON.parse(dataJSON);
    } catch (e) {
        return []; // boş array
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};