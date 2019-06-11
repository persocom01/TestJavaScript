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
  }
}

var prox = new Proxy(mafuyu, handler)
console.log('name' in prox)
console.log('_bhw' in prox)
