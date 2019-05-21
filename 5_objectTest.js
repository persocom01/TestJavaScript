// Demonstrates use of an object in JS.
var order = 'cola'
var menu = ['coffee', 'tea']
var i = 0
var cafe = {
  type: 'Maid',
  getMenu: getMenu(order),
  // Nested object.
  // Also demonstrates computed property names, which in this case evalutate
  // to 1 and 2. Computed property names are surrounded by [].
  // It is possible to compute strings as names as well.
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

// Demonstrates usage of in operator to check keys.
console.log('maids' in cafe)
console.log(cafe.type)
// Alternative to .getMenu.
console.log(cafe['getMenu'])
// Demonstrates access of nested object in object.
// Also demonstrates use of numerical keys, which can be accessed using obj[num].
console.log(cafe.maids[1])
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
console.log()

// Demonstrates copying and merging objects.
// It is possible to use sprad properties to do this but this method works
// for node.js.
var target = { a: '1', b: '2' }
var source = { b: '2', c: '3' }
var clonedObj = Object.assign({}, source)
var mergedObj = Object.assign(target, source)
console.log(clonedObj)
console.log(mergedObj)
console.log()

// Demonstrates turning object elements into individual variables.
var { a, b } = target
// Demonstrates renaming the individual elements.
// Also demonstrate giving a default value to alpha, which in this case
// has no effect.
var { a: alpha = 0, b: beta } = mergedObj
console.log('destructured object:', a, b)
console.log('renamed destructured object:', alpha, beta)
