// Demonstrates importing modules from the module folder.

// JS and node.js uses different syntax for imports, and while codes was
// written to be compatible with both as much as possible, it is not possible
// to write code for this topic that is compatible with both here.
// As such, priority is given to JS over node.js, and in order to see the
// results of this code, it needs to be loaded onto a server and
// 1_test.webpage.html opened on a web browser.

// Importing * imports everything, and as creates a module object, similar to
// python.
import * as mod1 from './modules/mod1.js'

// Demonstrates the 'normal' import in JS. The imports are put inside {} and
// you may optionally rename them with as. You may also have multiple imports
// by separating them with a ,.
// You are generally recommended to rename the objects on import instead
// of when they are exported.
import { Mod2Class as MyMod2Class, PromiseClass } from './myModuleAggregator.js'

// Demonstrates a default import. Unlike named imports, no {} is needed.
// You have to name the module object immediately instead of optionally.
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
// over their parents. Capturing, or trickling, does the opposite.
squareBtn.addEventListener('click', () => {
  // Demonstrates a conditional import. In this case the module is imported
  // on the condition of the event (a click) being executed.
  // The import function always returns a module object, and any references
  // to what is imported have to be done through that object.
  import('./myModuleAggregator.js').then(Module => {
    // This line is necessary because the import is a class object.
    let m3c = new Module.Mod3Class()
    // The innerHTML property determines the text on a button.
    if (squareBtn.innerHTML == 'Change color!') {
      m3c.changeColor()
      squareBtn.innerHTML = 'Change back!'
    } else {
      m3c.changeBack()
      squareBtn.innerHTML = 'Change color!'
    }
  })
})

document.querySelector('#import').textContent = mod1.mod1
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
