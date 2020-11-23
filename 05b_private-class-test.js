// Demonstrates private class fields and methods in js.
// This file contains relatively new additions to javascript and is preferably
// seen in a browser.

class Maid {
  // A private class variable is defined using #, normally at the top of the
  // class. They can only be accessed within the class itself. Subclasses are
  // also unable to access them.
  #age
  // Demonstrates a private static property. A private static property can only
  // be accessed by a private method.
  static #menu = ['coffee', 'tea']

  constructor(obj) {
    this.name = obj.name
    this.#age = obj.age
  }

  // Private properties can only be seen or modified using class methods.
  // get set methods do not work on private properties.
  askAge() {
    return this.#age
  }

  static lookAtMenu () {
    let output = ''
    for (var i = 0; i < (this.#menu.length - 1); i++) {
      output += this.#menu[i] + ', '
    }
    output = output.slice(0, -2)
    output += ' and ' + this.#menu[this.#menu.length - 1]
    return `They have ${output} on their menu.`
  }
}

var maika = new Maid({name: 'Maika', age: 16})

console.log(maika.name)
// Returns an error because private properties are not directly accessible.
// console.log(maika.#age)
console.log(maika.askAge())
console.log(Maid.lookAtMenu())
