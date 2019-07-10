// Demonstrates exporting things other than variables.
var text = 'mod2 class function functional.'

// An alternative to exporting default is exporting a class containing
// everything in one package.
class Mod2Class {
  // Exported functions can use non exported variables.
  mod2Fun () {
    document.querySelector('#modObject').textContent = text
  }
}

export { Mod2Class }
