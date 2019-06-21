// Demonstrates importing modules from the module folder.
// Using imported modules in html requires the use of the <script type='module'>
// tag in the html page. It also requires you to run the page from a server
// instead of opening the file in a browser.
import { mod1, sayHi } from './modules/mod1.js'

document.querySelector('#import').textContent = mod1

// // node.js uses require instead of import.
// // You may also skip the file extension.
// var mod1 = require('./modules/mod1')
// // Subsequent referencing of imported modules is done similarly to python,
// // with mod1.sayHi() referencing the imported function for example.
// mod1.sayHi()
