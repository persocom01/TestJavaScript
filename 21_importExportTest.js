// Demonstrates importing modules from the module folder.

// Importing * imports everything, and as creates a module object, similar to
// python.
import * as mod1 from './modules/mod1.js'

// Demonstrates the 'normal' import in JS. The imports are put inside {} and
// you may optionally rename them with as. You may also have multiple imports
// by separating them with a ,.
// You are generally recommended to rename the objects on import instead
// of when they are exported.
import { Mod2Class as MyMod2Class } from './myModuleAggregator.js'

// Demonstrates a default import. Unlike named imports, no {} is needed.
// You also have to name the module object immediately instead of optionally.
// Default imports are not recommended by some users as it is difficult to see
// what the imported object contains.
import myMod1 from './myModule1.js'

var squareBtn = document.querySelector('#button1')
// A full list of possible events can be found at:
// https://www.w3schools.com/jsref/dom_obj_event.asp
// The addEventListener method takes in 3 arguments. The event, the function
// to be executed when the event occurs, and a boolean value as to whether the
// event is detected via capturing (true) or bubbling (false).
// Bubbling is default, and it means the events of child elements take priority
// over their parents.
squareBtn.addEventListener('click', () => {
  // Demonstrates a conditional import. In this case the module is imported
  // on the condition of the event (a click) being executed.
  // The import function always returns a module object, and any references
  // to what is imported have to be done through that object.
  import('./myModule3.js').then(Module => {
    // This line is necessary because the import is a class object.
    let m3c = new Module.Mod3Class()
    m3c.mod3Fun()
  })
})

document.querySelector('#import').textContent = mod1.mod1
// When importing a class, you still need to assign it to a variable to use
// its methods.
var m2c = new MyMod2Class()
m2c.mod2Fun()
document.querySelector('#default1').textContent = myMod1.default1
document.querySelector('#default2').textContent = myMod1.default2

// // node.js uses require instead of import.
// // You may also skip the file extension.
// var mod1 = require('./modules/mod1')
// // Subsequent referencing of imported modules is done similarly to python,
// // with mod1.mod1Fun() referencing the imported function.
// mod1.mod1Fun()
