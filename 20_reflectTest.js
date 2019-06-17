// Demonstrates the use of the reflect object.
// Reflect is generally an alternative to object methods and in some cases
// returns more usable values compared to equivalent object methods.

// Syntax is apply(function, this, argArray)
// Functions which work on their own without requring a this value need to be
// passed one as undefined.
console.log(Reflect.apply(Math.max, undefined, [1, 10, 5]))
// You may also call apply using:
// Math.max.apply(undefined, [1, 10, 5])
console.log(Function.prototype.apply.call(Math.max, undefined, [1, 10, 5]))
console.log()

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
}
var args = ['Mafuyu', 'sadistic']

// Construct allows passing an array as if it were multiple arguments instead
// of a single array. Alternatively, use new Maid(...args).
var mafuyu = Reflect.construct(Maid, args)
console.log(mafuyu.name)

console.log(Reflect.defineProperty(mafuyu, 'role', { value: 'server' }))
console.log(mafuyu.role)

// Reflect.deleteProperty()
//
// Reflect.get()
//
// Reflect.getOwnPropertyDescriptor()
//
// Reflect.getPrototypeOf()
//
// Reflect.has()
//
// Reflect.isExtensible()
//
// Reflect.ownKeys()
//
// Reflect.preventExtensions()
//
// Reflect.set()
//
// Reflect.setPrototypeOf()
