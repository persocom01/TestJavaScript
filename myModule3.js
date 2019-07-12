// Demonstrates exporting a class.
var text = 'mod3 class function functional.'

// An alternative to exporting default is exporting a class containing
// everything in one package.
class Mod3Class {
  // Exported functions can use non exported variables.
  mod2Fun () {
    document.querySelector('#modObject2').textContent = text
  }
}

export { Mod3Class }
