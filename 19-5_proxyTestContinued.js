// Demonstrates the use of other proxy handlers besides get and set.

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
  this._bhw = bhw || ''
}
var mafuyu = new Maid('Mafuyu', 'sadistic', [32, 22, 34])

var handler = {
  // Demonstrates the has handler, which affects the in operator.
  // This one causes properties starting with _ to return false when checked
  // using the in operator.
  has (target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  },
  // Demonstrates the deleteProperty handler, which affects property.delete.
  deleteProperty (target, key) {
    console.log(`property ${key} is being deleted.`)
    // Without this the key won't actually be deleted.
    delete target[key]
    return true
  },
  // Disables the addition of custom properties using Object.defineProperties().
  defineProperty (target, key, descriptor) {
    return false
  },
  // Prevents iterative loops from returning private keys by returning a
  // custom iterator.
  enumerate (target) {
    return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]()
  },
  // Prevents Reflect.ownKeys() from returning private keys.
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_')
  }
}

var prox = new Proxy(mafuyu, handler)
console.log('public prop:', 'name' in prox)
console.log('hidden prop:', '_bhw' in prox)
delete prox.name
// Demonstrates the impact of the emumerate handler.
var arr = []
for (var key in prox) {
  arr.push(key)
}
console.log('enumerate handler:', arr)
console.log('reflect ownkeys:', Reflect.ownKeys(prox))
