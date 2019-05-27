// Demonstrates object prototypes.

// Demonstrates use of a constructor function.
function Maid (name, age, b, w, h) {
  // Properties are assigned using this.propertyname.
  this.name = name
  this.age = age
  this.b = b
  this.w = w
  this.h = h
  // Demonstrates an arrow function expression.
  // This one is equvalent to:
  // function () { return this.age++ }
  // Note that using {} means return must also be specified.
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

var kaho = new Maid('Kaho', 16, 36, 24, 36)
var mafuyu = new Maid('Mafuyu', 16, 32, 22, 34)

// Demonstrates in operator.
console.log('in operator:', 'name' in Maid)
// Demonstrates use of instanceof to test object class.
console.log('instanceof:', kaho instanceof Maid)
console.log(kaho.threeSizes())
kaho.growup()
console.log(kaho.age)

// Demonstrates passing objects to an object.
function Cafe (name, ...employees) {
  this.name = name
  this.employees = employees
}
var stile = new Cafe('stile', kaho, mafuyu)
// Demonstrates how to reference an object in an object.
console.log(stile.employees[0].name)
