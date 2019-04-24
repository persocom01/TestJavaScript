// Demonstrates use of an object in JS, which is like a python dictionary.

var order = 'cola'
var menu = ['coffee', 'tea']
var i = 0
var cafeObj = {
  type: 'Maid',
  getMenu: getMenu(order),
  // Nested object.
  // Also demonstrates computed property names, which in this case evalutate
  // to 1 and 2. It is possible to compute strings as names as well.
  maids: { [++i]: 'Miyuki', [++i]: 'Megumi' }
}

function getMenu (order) {
  // menu.indexOf(string) returns -1 if string is not found.
  if (menu.indexOf(order) > -1) {
    return order
  } else {
    return 'I\'m sorry but we don\'t carry ' + order + ', master.'
  }
}

console.log(cafeObj.type)
console.log(cafeObj.getMenu)
// Demonstrates access of nested object in object.
// Also demonstrates use of numerical keys, which can be accessed using obj[num].
console.log(cafeObj.maids[1])
console.log()

var objContinued = {
  // Unusual keynames.
  '': 'unusual name1',
  '!': 'unusual name2',
  // Adding a method to the object.
  printMethod () {
    return 'print content'
  }

}

// Demonstrates how to retrive unusual keys.
console.log(objContinued[''])
console.log(objContinued['!'])
console.log(objContinued.printMethod())
