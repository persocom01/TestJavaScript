// Demonstrates the use of the reflect object.
// Reflect is generally an alternative to object methods and in some cases
// returns more usable values compared to equivalent object methods.

// Syntax is apply(function, this, argArray).
// Functions which work on their own without requring a this value need to be
// passed one as undefined.
// You may also call apply using Math.max.apply(undefined, [1, 10, 5]).
console.log('f-apply:', Function.prototype.apply.call(Math.max, undefined, [1, 10, 5]))
console.log('r-apply:', Reflect.apply(Math.max, undefined, [1, 10, 5]))
console.log()

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
}
var args = ['Mafuyu', 'sadistic']

// Construct allows passing an array as if it were multiple arguments instead
// of a single array. Alternatively, use new Maid(...args).
var mafuyu = Reflect.construct(Maid, args)
console.log('construct:', mafuyu.name)
// Alternative to Object.getOwnPropertyDescriptor() but returns a TypeError
// if an object is not passed as the first argument.
console.log('r-propertyDescriptor:', Reflect.getOwnPropertyDescriptor(mafuyu, 'name'))
console.log()

// Demonstrates the difference between the obejct and reflect version.
console.log('o-defineProperty:', Object.defineProperty(mafuyu, 'role', { value: 'server' }))
// Returns a boolean instead of the object.
console.log('r-defineProperty:', Reflect.defineProperty(mafuyu, 'role', { value: 'server' }))
// Demonstrates how to use Reflect.set(object, propertyName, propertyValue)
// In this case, it returns false if you try to set a property that already
// exists.
console.log('r-set:', Reflect.set(mafuyu, 'age', 16))
// I'm not sure what the practical use of this is, but this is how to use it.
console.log('r-get:', Reflect.get(mafuyu, 'role'))
// An alternative to delete mafuyu.age.
// Returns true even if the target did not exist to begin with.
console.log('r-delete:', Reflect.deleteProperty(mafuyu, 'age'))
console.log('r-ownKeys:', Reflect.ownKeys(mafuyu))
console.log()

// Demonstrates how to use set and get prototype, which in this case isn't
// meant to do anything.
console.log('r-setProto:', Reflect.setPrototypeOf(mafuyu, Maid.prototype))
console.log('r-getProto:', Reflect.getPrototypeOf(mafuyu))
console.log('r-has:', Reflect.has(mafuyu, 'attrib'))
console.log('r-preventExtensions:', Reflect.preventExtensions(mafuyu))
console.log('r-isExtensible:', Reflect.isExtensible(mafuyu))
