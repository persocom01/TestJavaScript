// Classes are special functions in JS.
// Unlike functions, classes are not hoisted. They need to be declared
// before use.
var menu = ['coffee', 'tea']

// Classes can be made in two ways, the first being class declarations.
class Maid {
  // All classses have a special method called a constructor. It initializes
  // the class object.
  // Classes can commonly accept arguments. For small numbers of aruments, this
  // works. For larger numbers of arguments, try accepting an object instead.
  constructor (name, attribute) {
    this.name = name
    this.attrib = attribute
  // Unlike with normal objects, a , isn't needed between methods.
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
    return `${firstCaps} maid ${this.name} at your service, master ${name}.`
  }

  // A static method is one that is called using the base class instead of the
  // class instance. Calling it inside a class instance causes an error.
  // Normally used for utility functions.
  static lookAtMenu () {
    return `They have ${menu} on their menu.`
  }
}

// Like normal objects, you may define prototype properties.
Maid.prototype.greet = function () {
  return 'Welcome back, master.'
}

var maika = new Maid('Maika', 'sadistic')
console.log(maika.gsName)
// Normal methods require () unlike get methods.
console.log(maika.title('Dino'))
console.log(Maid.lookAtMenu())
console.log(maika.greet())
console.log()

// Demonstrates a mixin.
// Mixins can be said to be class parts meant to be used with other classes.
// Although they do not have a superclass, you can have mixins inherit from
// other mixins using:
// var mixin2 = base => class extends mixin1(base) {}
var magicMixin = base => class extends base {
  twinDragonLightning (target) {
    return `Casting 7th tier magic twin dragon lightning at ${target}.`
  }
}

// Demonstrates the 2nd way to create a class, a class expression.
// You can leave out the class name, but then I don't see why you won't just
// use a class declaration instead.
// Also demonstrates the use of a mixin.
// To use multiple mixins, use mixin1(mixin2(baseClass)).
// Extends is used to make BattleMaid a subclass of Maid.
// You may also extend function objects.
// However, to inherit from objects created with the object initializer, use:
// Object.setPrototypeOf(subclass.prototype, baseObject).
var BM = class BattleMaid extends magicMixin(Maid) {
  constructor (name, position) {
    super(name, 'battle')
    this.position = position
  }

  // You may call methods of the base class using super.
  title (name) {
    return super.title(name) + '\n' + 'I am ready for Battle.'
  }
}
// Note that in this case you create a class using the variable name instead of
// the class name.
var narberal = new BM('Narberal', 3)
// Unlike normal objects, protoype properties of the subclass are automatically
// inherited.
console.log(narberal.greet())
// Subclass methods overwrite base class methods.
console.log(narberal.title('Ains'))
// Mixin method.
console.log(narberal.twinDragonLightning('Skeletal Dragon'))
