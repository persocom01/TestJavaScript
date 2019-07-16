// Demonstrates using JS to modify text on a html document.

class Mod3Class {
  // Exported functions can use non exported variables.
  mod3Fun () {
    // .querySelectorAll selects all instead of just the first one.
    // More css color codes can be found here:
    // https://www.w3schools.com/cssref/css_colors.asp
    document.querySelectorAll('div').style.color = '#6495ED'
    document.querySelectorAll('div').bold()
  }
}

export { Mod3Class }
