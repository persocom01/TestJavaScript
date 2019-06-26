// Demonstrates exporting things other than variables.
var text = 'mod2 function functional.'

// Exported functions can use non exported variables.
export function mod2Fun () {
  document.querySelector('#modObject').textContent = text
}
