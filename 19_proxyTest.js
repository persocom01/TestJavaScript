// Demonstrates the use of proxies, which can be thought of as an object wrapper.

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
  this._bhw = bhw || ''
}
var mafuyu = new Maid('Mafuyu', 'sadistic', [32, 22, 34])

// Demmonstrates the handler variable, which in this case alters the behaviour
// of getting and setting object properties.
var handler = {
  get (target, key) {
    keepPrivate(key)
    console.info(`Get on property "${key}"`)
    return target[key]
  },
  set (target, key, value) {
    keepPrivate(key)
    return true
  }
}

// This function makes properties starting with "_" inaccessible.
function keepPrivate (key) {
  if (key[0] === '_') {
    throw new Error(`The property "${key}" is private`)
  }
}

// The syntax for a proxy is new Proxy(object, handler).
var prox = new Proxy(mafuyu, handler)
console.log(prox.name)
console.log(prox._bhw)
