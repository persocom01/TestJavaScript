// Demonstrates even more proxy handlers.

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
  this._bhw = bhw || ''
}
var mafuyu = new Maid('Mafuyu', 'sadistic', [32, 22, 34])

var mustExtend = new WeakSet()
var handler = {
  // The construct handler affects objects made using the new keyword.
  construct (target, args) {
    return new target(...args)
  },
  // Affects .isPrototypeOf(), .getPrototypeOf(), and instanceof.
  // Can be used to direct object prototype quries to a particular prototype,
  // although it is unknown what the practicality of this is.
  getPrototypeOf (target) {
    return Maid
  },
  // Affects the Object.setPrototypeOf() method.
  setPrototypeOf (target, proto) {
    Object.setPrototypeOf(target, proto)
  },
  // Affects the Object.isExtensible() method which checks if new properties
  // can be added to an object.
  isExtensible (target) {
    return Object.isExtensible(target)
  },
  // Affects Object.preventExtensions()
  preventExtensions (target) {
    // This prevents Object.preventExtensions() from being used on objects in
    // mustExtend.
    if (!mustExtend.has(target)) {
      Object.preventExtensions(target)
    }
    // preventExtensions always returns the opposite of isExtensible or a
    // TypeError will occur.
    return !Object.isExtensible(target)
  }
}

var prox = new Proxy(mafuyu, handler)
// Note to utilize the effect of the preventExtensions handle, the object added
// to the list must be the base object and not the proxy itself.
mustExtend.add(mafuyu)
// Returns false due to previous line.
Object.preventExtensions(prox)
