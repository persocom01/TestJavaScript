// Classes are special functions in JS.
// Unlike functions, classes are not hoisted. They need to be declared
// before use.
var menu = ['coffee', 'tea']

// Classes can be made in two ways, the first being class declarations.
class Maid {
  // All classses have a special mthod called constructor.
  // It initializes the class object.
  constructor (name, attribute) {
    this.name = name
    this.attrib = attribute
  }
  // Demonstrates a get set pair inside a class.
  set gsName (newName) {
    this.name = newName
  }
  get gsName () {
    return `My name is ${this.name}, master.`
  }
  // Demonstrates a normal method.
  title (name) {
    var firstCaps = this.attrib.charAt(0).toUpperCase() + this.attrib.slice(1)
    return `I am ${firstCaps} maid ${this.name}, master ${name}.`
  }
  // A static method is one that is called using the base class instead of the
  // class instance. In fact, calling it inside a class instance causes an error.
  static lookAtMenu () {
    return `They have ${menu} on their menu.`
  }
}
var mafuyu = new Maid('Mafuyu', 'sadistic')
console.log(mafuyu.gsName)
// Normal methods require () unlike get methods.
console.log(mafuyu.title('Dino'))
console.log(Maid.lookAtMenu())

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
