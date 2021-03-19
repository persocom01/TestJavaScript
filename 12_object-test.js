// Demonstrates use of an object in JS. Objects are the javascript equivalent
// of python dictionaries, with a few exceptions. When JS is run in a browser,
// the window object is present by default. console.log(this.property) refers
// to this object in the absence of any other context.

// Objects are a reference type in JS. In practical terms, this means two
// objects are never equal. Unlike python, all object keys are converted to
// strings, so { key: value } is the same as { 'key': value }. However, it can
// be beneficial to use 'key' instead of key if the key contains problematic
// characters such as whitespaces.
var fruit = {
  name: 'apple',
  1: 23,
  'origin.country': 'usa',
  // Demonstrates adding a method to the object.
  namePrint () {
    // this refers to the object itself.
    console.log('object method: ', this.name)
  }
}
var fruit2 = {
  name: 'apple',
  1: 23,
  'origin.country': 'usa',
  namePrint () {
    console.log('object method: ', this.name)
  }
}
console.log('comparison:', fruit === fruit2)
fruit2 = fruit
// They are now equal because their references are the same.
console.log('comparison2:', fruit === fruit2)
// Unlike python dictionaries, object properties can be referenced using
// object.property. However, numerical keys cannot be referenced this way, and
// must instead be referenced using object[number]. object['number'] does the
// same thing because numerical keys are not differentiated from their string
// equivalents.
console.log('object numberical property:', fruit[1])
// Unusual keynames like '', '!', strings with whitespaces or reserved
// characters like . need to be called using [].
console.log('unusual keynames property:', fruit['origin.country'])
// Demonstrates calling an object method.
fruit.namePrint()
// Deletes an object property.
delete fruit.name
// Changing the first object causes the second object to change.
// This isn't true with normal variables.
console.log('both are changed:', fruit2.name)
console.log()

// Creating an object this way is known as using an object initializer.
// An object may also be created using a constructor function,
// this is covered under prototypeTest.
var cafe = {
  // Demonstrates a getter method. Getters take no arguments.
  // Calling this method uses cafe.getMenu instead of cafe.getMenu().
  get getMenu () {
    // Demonstrates use of a template referencing an object property.
    return `We have ${this.menu} on our menu, master.`
  },
  // Demonstrates a get set pair, which use the same method name.
  // This pair is also made to set the property of the same name. When doing so
  // the property must be refered to as this._propertyname, or a RangeError
  // will occur.
  set name (name) {
    // Using a method to set object properties is recommended as one is able to
    // perform things like input validation.
    if (typeof name === 'string') {
      this._name = name
    } else {
      console.log('name must be a string')
    }
  },
  get name () {
    return this._name
  },
  // Demonstrates how to define a 'normal' object property.
  industry: { value: 'service' },
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

// Demonstrates how to set the above getMenu and name methods after the
// object is defined instead of when it is defined.
// If you comment out the whole section below, the section aboves should work
// the exact same way.
Object.defineProperties(cafe, {
  // The syntax is fairly complicated in this case because we are defining
  // multiple object properties at the same time.
  // If only one property needs to be defined, you may use:
  // Object.defineProperty(cafe, propertyName, objectWithSetGetMethods)
  // Object.defineProperty may run faster than Object.defineProperties,
  // but the difference is minimal.
  getMenu: {
    get: function () {
      return `We have ${this.menu} on our menu, master.`
    }
  },
  name: {
    set: function (name) {
      if (typeof name === 'string') {
        this._name = name
      } else {
        console.log('name must be a string')
      }
    },
    get: function () {
      return this._name
    }
  }
})

var menu = ['coffee', 'tea']
var i = 0
// Demonstrates use of the Object.create() method.
// It is said to be easier to extend the properties of a base object this way.
var stile = Object.create(cafe, {
  name: {
    // Note the somewhat convoluted way in which an object property is set.
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
// Lists all object values.
console.log('values:', Object.values(stile))
// Lists all object keys and values.
// To iterate over the object, use Object.entries(object).forEach((item) => {
//   key = item[0]
//   value = item[1]
// })
console.log('entries:', Object.entries(stile))
// Demonstrates usage of the in operator to check keys.
console.log('in:', 'maids' in stile)
console.log('property:', stile.maids)
// Alternative to .takeOrder().
console.log('property sq:', stile['takeOrder']('cola'))
// The get method doesn't require ().
console.log('get method:', stile.getMenu)
// Set methods use = instead of .name(name).
stile.name = 'Wagnaria'
console.log('set method:', stile.name)
// Demonstrates access of nested object in object.
// Also demonstrates use of numerical keys, which can be accessed using obj[num].
console.log('property num:', stile.maids[1])
console.log()

// Demonstrates copying and merging objects.
// It is possible to use spread properties to do this but this method works
// for older versions of node.js.
var target = { a: '1', b: '2' }
var source = { b: '2', c: '3' }
var clonedObj = Object.assign({}, source)
var mergedObj = Object.assign(target, source)
var spreadMerge = { ...target, ...source }
console.log(clonedObj)
console.log(mergedObj)
console.log(spreadMerge)
console.log()

// Demonstrates turning object elements into individual variables.
// {var} must be a property of the target. Most commonly seen in import
// statements when importing part of a library in the form:
// import {component} from 'library-path'
var { a, c } = target
// Demonstrates renaming the individual elements.
// Also demonstrates giving a default value to alpha, which in this case
// has no effect.
var { a: alpha = 0, b: beta } = mergedObj
console.log('2/3 vars from destructured object:', a, c)
console.log('renamed destructured object:', alpha, beta)
