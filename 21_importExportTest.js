// Demonstrates importing modules from the module folder.
import { sayHi } from './modules/mod1'

// node.js uses require instead of import.
// var mod1 = require('./modules/mod1')
// // Subsequent referencing of imported modules is done similarly to python,
// with mod1.sayHi() referencing the imported function for example.
mod1.sayHi()
