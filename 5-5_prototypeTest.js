// Demonstrates object prototypes.
var kaho = new Maid('Kaho', 36, 24, 36)

function Maid (name, b, w, h) {
  this.name = name
  this.b = b
  this.w = w
  this.h = h
}

// While you could make this an object property, using a prototype means this
// function is not re created every time a new object of the class is made.
Maid.prototype.threeSizes = function () {
  var arr = [ this.b, this.w, this.h ]
  return arr.join(', ')
}

console.log(kaho.threeSizes())
