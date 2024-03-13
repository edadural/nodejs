const yargs = require('yargs')
const notes = require('./notes.js');

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Yeni not ekler',
    builder: {
        title: {
            describe: 'Not başlığı',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Not içeriği',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Seçilen notu siler',
    builder: {
        title: {
            describe: 'Not Başlığı',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Mevcut notları listeler',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Seçilen notu gösterir',
    builder: {
        title: {
            describe: 'Not Başlığı',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse()