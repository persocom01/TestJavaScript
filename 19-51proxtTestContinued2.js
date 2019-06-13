// Demonstrates even more proxy handlers.

function Maid (name, attribute, bhw) {
  this.name = name || ''
  this.attrib = attribute || ''
  this._bhw = bhw || ''
}
var mafuyu = new Maid('Mafuyu', 'sadistic', [32, 22, 34])

var handler = {
  // The construct handler affects objects made using the new keyword.
  construct (target, args) {
    return new target(...args)
  },
  getPrototypeOf (target) {
    return Maid
  }
}

var prox = new Proxy(mafuyu, handler)
