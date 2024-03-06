const yargs = require("yargs");
const add = require('./add.js');
const delet = require('./delete.js');
const divide = require('./divide.js');
const subtract = require('./subtract.js');

yargs.command({
    command: 'add',
    describe: 'Toplama',
    builder: {
        operand1: {
            describe: 'operand1',
            demandOption: true,
            type: 'number'
        },
        operand2: {
            describe: 'operand2',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function (argv) {
        const added = add(argv.operand1, argv.operand2);
        console.log(added);
    }
})

yargs.command({
    command: 'delete',
    describe: 'Çıkarma',
    builder: {
        operand1: {
            describe: 'operand1',
            demandOption: true,
            type: 'number'
        },
        operand2: {
            describe: 'operand2',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function (argv) {
        const deleted = delet(argv.operand1, argv.operand2);
        console.log(deleted);
    }
})

yargs.command({
    command: 'subtract',
    describe: 'Çarpma',
    builder: {
        operand1: {
            describe: 'operand1',
            demandOption: true,
            type: 'number'
        },
        operand2: {
            describe: 'operand2',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function (argv) {
        const subtracted = subtract(argv.operand1, argv.operand2);
        console.log(subtracted);
    }
})

yargs.command({
    command: 'divide',
    describe: 'Bölme',
    builder: {
        operand1: {
            describe: 'operand1',
            demandOption: true,
            type: 'number'
        },
        operand2: {
            describe: 'operand2',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function (argv) {
        const divided = divide(argv.operand1, argv.operand2);
        console.log(divided);
    }
})

yargs.parse();