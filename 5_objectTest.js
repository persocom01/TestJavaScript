// Demonstrates use of an object in JS.

// Creating an object this way is known as using an object initializer.
// An object may also be created using a contructor function, covered under prototypes.
var cafe = {
  getMenu: function () {
    // Demonstrates use of a template referencing an object property.
    return `We have ${this.menu} on our menu, master`
  },
  // An alternative to the above way to writing an object method.
  takeOrder (order) {
    // Note the reference to a property this.menu that doesn't yet exist.
    // this refers to the object itself, but this.form refers to the parent form.
    // Not relevant here but maybe elsewhere.
    if (this.menu.indexOf(order) > -1) {
      return 'Here is your ' + order + ', master.'
    } else {
      return 'I\'m sorry but we don\'t carry ' + order + ', master.'
    }
  }
}

var menu = ['coffee', 'tea']
var i = 0
// Demonstrates use of the Object.create() method.
// It is said to be easier to extend the properties of a base object this way.
var stile = Object.create(cafe, {
  name: {
    // Note the somewhat convoluted of setting the value of an object property.
    value: 'Stile',
    // However, it is possible to set property attributes
    // enumerable, writable, or configurable more easily this way.
    // Using Object.create() makes these properties false by default compared
    // to true by default using other methods.
    enumerable: true
  },
  menu: {
    // While totally unnecessary, demonstrates passing a variable as a property.
    value: menu
  },
  maids: {
    // Nested object.
    // Also demonstrates computed property names, which in this case evalutate
    // to 1 and 2. Computed property names are surrounded by [].
    // It is possible to compute strings as names as well.
    value: { [++i]: 'Mafuyu', [++i]: 'Kaho' },
    enumerable: true
  }
})

// Lists all keys. Only properties with attribute enumerable: true will be displayed.
console.log('keys:', Object.keys(stile))
// Does the same thing, but if used on an array, also returns the length property.
console.log('get own property:', Object.getOwnPropertyNames(stile))
// Demonstrates usage of in operator to check keys.
console.log('in:', 'maids' in stile)
console.log('property:', stile.maids)
// Alternative to .getMenu.
console.log('property sq:', stile['takeOrder']('cola'))
// The normal way to call an object method instead of the above.
console.log('method:', stile.getMenu())
// Demonstrates access of nested object in object.
// Also demonstrates use of numerical keys, which can be accessed using obj[num].
console.log('property num:', stile.maids[1])
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
