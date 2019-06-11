// Demonstrates use of an object in JS.

// Objects are a reference type in JS. Thus two objects are never equal.
var fruit = { name: 'apple' }
var fruit2 = { name: 'apple' }
console.log('comparison:', fruit === fruit2)
fruit2 = fruit
// They are now equal because their references are the same.
console.log('comparison2:', fruit === fruit2)
// However, changing the first object causes the second object to change.
// This isn't true with normal variables.
// Deletes an object property.
delete fruit.name
console.log('both are changed:', fruit2.name)
console.log()

// Creating an object this way is known as using an object initializer.
// An object may also be created using a contructor function,
// this is covered under prototypeTest.
var cafe = {
  // Demonstrates a getter method. Getters take no arguments.
  // The advantage seems to be that calling this method uses cafe.getMenu
  // instead of cafe.getMenu().
  get getMenu () {
    // Demonstrates use of a template referencing an object property.
    return `We have ${this.menu} on our menu, master.`
  },
  // Demonstrates a get set pair, which use the same method name.
  set gsName (name) {
    this.name = name
  },
  get gsName () {
    return this.name
  },
  // Alternatively written as takeOrder (order).
  takeOrder: function (order) {
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

// Demonstrates how to set the above getMenu and gsName methods after the
// object is defined instead of when it is defined.
// If you comment out the whole section below, the section aboves should work
// the exact same way.
Object.defineProperties(cafe, {
  // The syntax is fairly complicated in this case because we give the function
  // the object property names as an object with nested objects instead of a
  // string.
  // If we use a string as property name instead, the syntax would be written
  // as Object.defineProperties(cafe, 'propertyName', objectWithSetGetMethods).
  getMenu: {
    get: function () {
      return `We have ${this.menu} on our menu, master.`
    }
  },
  gsName: {
    set: function (name) {
      this.name = name
    },
    get: function () {
      return this.name
    }
  }
})

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
    enumerable: true,
    writable: true
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

// Lists all property names with attribute enumerable: true.
console.log('keys:', Object.keys(stile))
// Does the same thing, but doesn't require attribute enumerable: true.
// If used on an array, also returns the length property.
console.log('get own property:', Object.getOwnPropertyNames(stile))
// Using reflect to do the same thing.
console.log('reflect:', Reflect.ownKeys(stile))
// Demonstrates usage of the in operator to check keys.
console.log('in:', 'maids' in stile)
console.log('property:', stile.maids)
// Alternative to .takeOrder().
console.log('property sq:', stile['takeOrder']('cola'))
// The get method doesn't require ().
console.log('get method:', stile.getMenu)
// Set methods use = instead of .gsName(name).
stile.gsName = 'Wagnaria'
console.log('set method:', stile.gsName)
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
// Also demonstrates giving a default value to alpha, which in this case
// has no effect.
var { a: alpha = 0, b: beta } = mergedObj
console.log('destructured object:', a, b)
console.log('renamed destructured object:', alpha, beta)
