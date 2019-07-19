// Demonstrates using JS to modify text on a html document.

class Mod3Class {
  // Exported functions can use non exported variables.
  mod3Fun () {
    // .querySelectorAll selects all instead of just the first one.
    // It returns an array so it needs to be iterated over.
    let selection = document.querySelectorAll('.divText')
    for (var i = 0; i < selection.length; i++) {
      // More css color codes can be found here:
      // https://www.w3schools.com/cssref/css_colors.asp
      selection[i].style.color = '#6495ED'
      selection[i].style.fontWeight = 'bold'
    }
  }
}

export { Mod3Class }
