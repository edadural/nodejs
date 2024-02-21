const getNotes = require('./notes.js')
const validator = require('validator')
const chalk = require('chalk')

const message = getNotes()
console.log(message)
console.log(validator.isEmail('test.btu.edu.tr'))
console.log(validator.isURL('www.btu.edu.tr'))
console.log(chalk.green.bold('Success'))