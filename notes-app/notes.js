const fs = require('fs') // okuma yapmak için
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes(); // mevcut notlar yüklenir. array
    // const dublicateNotes = notes.filter((note) => note.title === title)
    const dublicateNote = notes.find((note) => note.title === title)

    // Debugging
    console.log(dublicateNote);
    debugger
    
    // if (dublicateNote.length === 0) { // hiçbir eşleşme sağlanmamışsa yeni not eklenir
    if (!dublicateNote) { // tekrarlanmış not yoksa
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

const removeNote = (title) => {
    const notes = loadNotes()
    // title'a eşit olmayanları sakla
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) { // saklamak istediğim notların sayısı ile silmek istediğim not sayısından büyük ise
        console.log(chalk.green.inverse("Not silindi")) // yazı rengiyle arka planın tersi renk olması : inverse
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse("Not bulunamadı"))
    }
}

const listNotes = () => {
    const notes = loadNotes() // dosyadan okuma islemi

    console.log(chalk.inverse("Kayıtlı notlar: "));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("Bu başlığa sahip bir not bulunamamıştır."));
    }
}

const loadNotes = () => { // dosydan okuma işlemi yapcak
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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};