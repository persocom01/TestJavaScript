// Demonstrates exporting a class.
var text = 'mod2 class function functional.'

// An alternative to exporting default is exporting a class containing
// everything in one package.
class Mod2Class {
  // In order to export variables while exporting a class, use a constructor.
  constructor () {
    // A non exported variable was used to demonstrate that it can be used
    // in an exported class.
    this.text = text
  }
  mod2Fun () {
    document.querySelector('#modObject').textContent = this.text
  }
}

export { Mod2Class }
