// Classes are special functions in JS.
// Unlike functions, classes are not hoisted. They need to be declared
// before use.
var menu = ['coffee', 'tea', 'strawberry shortcake']

// Classes can be made in two ways, the first being class declarations.
class Maid {
  // static properties are recent additions to javascript. They work like static
  // methods but for properties.
  // static menu = ['coffee', 'tea']

  // All classses have a special method called a constructor. It initializes
  // the class object.Classes commonly accept arguments. For small numbers of
  // arguments, accepting them directly works. For more complex arguments,
  // it is recommended that one accept an object with the arugments as object
  // properties instead.
  constructor (name, attribute) {
    this.name = name
    this.attrib = attribute
  }

  // Demonstrates a get set pair inside a class.
  // The use of get set methods is that they replace what would otherwise be a
  // normal property call such as class.name, thus allow you to do such things
  // as defining a custom message.
  get name () {
    // You need to put a _ in front of the property to prevent looping errors
    // where the program is unsure whether you are calling the value or the get
    // method.
    return `My name is ${this._name}, master.`
  }

  set name (newName) {
    if (typeof newName !== 'string') {
      throw Error('name must be a string')
    }
    // Note the _
    this._name = newName
  }

  // Demonstrates a normal method. Within a class, this refers to the class
  // instance, and not the method.
  title (name) {
    var firstCaps = this.attrib.charAt(0).toUpperCase() + this.attrib.slice(1)
    return `${firstCaps} maid ${this._name} at your service, master ${name}.`
  }

  // A static method is one that is called using the base class instead of the
  // class instance. Calling it inside a class instance causes an error.
  // Normally used for utility functions.
  static lookAtMenu () {
    let output = ''
    for (var i = 0; i < (menu.length - 1); i++) {
      output += menu[i] + ', '
    }
    output = output.slice(0, -2)
    output += ' and ' + menu[menu.length - 1]
    return `They have ${output} on their menu.`
  }
}

// Like normal objects, you may define prototype properties.
Maid.prototype.greet = function () {
  return 'Welcome back, master.'
}

var maika = new Maid('Maika', 'sadistic')
// Normal methods require () unlike get methods.
console.log(maika.name)
// An error will be thrown when name is set to anything but a string.
maika.name = 'Maika Sakuranomiya'
console.log(maika.name)
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
