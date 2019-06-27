// Classes are special functions in JS.
// Unlike functions, classes are not hoisted. They need to be declared
// before use.

// Classes can be made in two ways, the first being class declarations.
class Maid {
  // All classses have a special mthod called constructor.
  // It initializes the class object.
  constructor (name, attribute) {
    this.name = name
    this.attrib = attribute
  }
}
var mafuyu = new Maid('Mafuyu', 'sadistic')
console.log(mafuyu.name)

// Alternatively, use a class expression.
// You can leave out the class name, but then I don't see why you won't just
// use a class declaration instead.
var BM = class BattleMaid {
  constructor (name, position) {
    this.name = name
    this.position = position
  }
}
// Note that in this case you create a class using the variable name instead of
// the class name.
var narberal = new BM('Narberal', 3)
console.log(narberal.name)
