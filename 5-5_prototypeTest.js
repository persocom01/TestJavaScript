// Demonstrates object prototypes.
var kaho = new Maid('Kaho', 36, 24, 36)

function Maid (name, b, w, h) {
  this.name = name
  this.b = b
  this.w = w
  this.h = h
}

Maid.prototype.threeSizes = function () {
  var arr = [ this.b, this.w, this.h ]
  return arr.join(', ')
}

console.log(kaho.threeSizes())
