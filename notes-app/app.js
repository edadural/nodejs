const yargs = require('yargs')
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
    handler: function (argv) {
        console.log("Başlık: ", argv.title);
        console.log("İçerik: ", argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Seçilen notu siler',
    handler: function () {
        console.log("Not siliniyor.");
    }
})

yargs.command({
    command: 'list',
    describe: 'Mevcut notları listeler',
    handler: function () {
        console.log("Notlar listeleniyor.");
    }
})

yargs.command({
    command: 'read',
    describe: 'Seçilen notu gösterir',
    handler: function () {
        console.log("Not gösteriliyor.");
    }
})

yargs.parse()