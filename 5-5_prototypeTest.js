// Demonstrates object prototypes.

// Demonstrates use of a constructor function.
function Maid (name, age, b, w, h) {
  // Properties are assigned using this.propertyName.
  // || '' is used to define a default value if none is passed during
  // object construction.
  this.name = name || ''
  // Demonstrates an ad hoc way to create get set pair in a constructor function.
  // To create a 'real' get set pair, use Object.defineProperty() instead.
  this.rename = {
    set setName (newName) {
      this.name = newName
    },
    get getName () {
      return `My name is ${this.name}`
    }
  }
  this.age = age || ''
  this.b = b || ''
  this.w = w || ''
  this.h = h || ''
  // Demonstrates an arrow function expression.
  // This one is equivalent to: function () { return this.age++ }
  // Using an anonymous function means this.age refers to this.age in the
  // outer function.
  this.growup = () => this.age++
}

// While you could make this an object property, using a prototype means this
// function is not re created every time a new object of the class is made.
// Prototypes are unable to use arrow functions as this.propertyName will
// return undefined.
Maid.prototype.threeSizes = function () {
  var arr = [ this.b, this.w, this.h ]
  return arr.join(', ')
}
// This was written to demonstrate that local properties are given precedence
// over prototype properties.
Maid.prototype.name = 'name'

var kaho = new Maid('Kaho', 16, 36, 24, 36)
var mafuyu = new Maid('Mafuyu', 16, 32, 22, 34)

// Demonstrates in operator.
console.log('in operator:', 'name' in Maid)
// Demonstrates use of instanceof to test object class.
console.log('instanceof:', kaho instanceof Maid)
console.log('prototype function:', kaho.threeSizes())
kaho.growup()
console.log('arrow function method:', kaho.age)
// In JS you may add properties to an object at any time.
kaho.crush = 'Akizuki'
console.log('adding properties:', kaho.crush)
kaho.rename.setName = 'Kaho2'
console.log(kaho.rename.getName)
console.log()

// Demonstrates passing objects to an object.
function Cafe (name, ...employees) {
  this.name = name
  this.employees = employees
}
var stile = new Cafe('stile', kaho, mafuyu)
// Demonstrates how to reference an object in an object.
console.log('nested object property:', stile.employees[0].name)

// Demonstrates how to create a 'subclass' of an object in JS.
function BattleMaid (name, age, b, w, h) {
  // Copies all properties of Maid to BattleMaid.
  // It is possible for an object to inherit the local properties of multiple
  // objects by calling them this way. However, you may only inherit prototype
  // properties of one object.
  // This is an alternative to writing:
  // this.base = Maid
  // this.base(this, name, age, b, w, h)
  Maid.call(this, name, age, b, w, h)
  this.function = 'combat'
}
// You need this these two statements to copy the prototype properties of the
// base object.
BattleMaid.prototype = Object.create(Maid.prototype)
BattleMaid.prototype.constructor = BattleMaid
var narberal = new BattleMaid('Narberal', 90, 39, 26, 39)
console.log('subclass:', narberal.threeSizes())
