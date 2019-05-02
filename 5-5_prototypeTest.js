// Demonstrates object prototypes.
var kaho = new Maid('Kaho', 16, 36, 24, 36)

function Maid (name, age, b, w, h) {
  this.name = name
  this.age = age
  this.b = b
  this.w = w
  this.h = h
  // Demonstrates an arrow function expression.
  // This one is equvalent to:
  // function () { return this.age++ }
  // It is also possible to write () => { return this.age++ }
  // however, using {} means return must also be specified.
  // Using an anonymous function means this.age refers to this.age in the
  // outer function.
  this.growup = () => this.age++
}

// While you could make this an object property, using a prototype means this
// function is not re created every time a new object of the class is made.
Maid.prototype.threeSizes = function () {
  var arr = [ this.b, this.w, this.h ]
  return arr.join(', ')
}

console.log(kaho.threeSizes())
kaho.growup()
console.log(kaho.age)
