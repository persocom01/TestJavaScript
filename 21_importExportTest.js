// Demonstrates importing modules from the module folder.

// Importing * imports everything, and as creates a module object, similar to
// python.
import * as mod1 from './modules/mod1.js'

// You are generally recommended to rename the objects on import instead
// of when they are exported.
import { mod2Fun as myMod2Fun } from './myModule2.js'

// Demonstrates a default import. Unlike named imports, no {} is needed.
// You also have to name the default object immediately instead of using as.
import myMod1 from './myModule1.js'

document.querySelector('#import').textContent = mod1.mod1
myMod2Fun()
document.querySelector('#default1').textContent = myMod1.default1
document.querySelector('#default2').textContent = myMod1.default2

// // node.js uses require instead of import.
// // You may also skip the file extension.
// var mod1 = require('./modules/mod1')
// // Subsequent referencing of imported modules is done similarly to python,
// // with mod1.mod1Fun() referencing the imported function.
// mod1.mod1Fun()
