// Demonstrates the use of proxies, which can be thought of as object wrappers.

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
  this._bhw = bhw || ''
}
var mafuyu = new Maid('Mafuyu', 'sadistic', [32, 22, 34])

// The reason you wrap the proxy in a function is to take away access of the
// target from users.
function mafuyuProxy () {
  var target = mafuyu
  // Demonstrates the handler variable, which in this case alters the behaviour
  // of getting and setting object properties.
  var handler = {
    get (target, key) {
      keepPrivate(key)
      return target[key]
    },
    set (target, key, value) {
      keepPrivate(key)
      // Demonstrates use of a proxy as a validator for correct set values.
      if (typeof value !== 'string') {
        throw new TypeError('Input must be a string.')
      }
      return true
    }
  }
  // The syntax for a proxy is new Proxy(object, handler).
  // However, revocable proxies use Proxy.revocable(object, handler) instead.
  // Revocable proxies return an object with two keys:
  // { proxy: proxyObject, revoke: revokeFunction }
  return Proxy.revocable(target, handler)
}

// This function makes properties starting with "_" inaccessible.
function keepPrivate (key) {
  if (key[0] === '_') {
    throw new Error(`The property "${key}" is private`)
  }
}

// In order to capture both keys as variables in the revocable proxy object we
// use this syntax. It is covered in objectTest.
var { proxy: prox, revoke } = mafuyuProxy()
console.log('name:', prox.name)
// Causes an error for wrong property.
// console.log('error:', prox._bhw)
// Causes an error for wrong type.
// prox.name = [1, 2, 3]
revoke()
// Causes a TypeError after the proxy has been revoked.
console.log('name:', prox.name)
