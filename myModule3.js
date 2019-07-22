// Demonstrates using JS to modify text on a html document.

// .querySelectorAll selects all instead of just the first one.
// It returns an array so it needs to be iterated over.
var selection = document.querySelectorAll('.divText')
class Mod3Class {
  // Exported functions can use non exported variables.
  changeColor () {
    for (var i = 0; i < selection.length; i++) {
      // More css color codes can be found here:
      // https://www.w3schools.com/cssref/css_colors.asp
      selection[i].style.color = '#6495ED'
      // Note that to change an element property, you cannot use JS .bold().
      selection[i].style.fontWeight = 'bold'
    }
  }
  changeBack () {
    for (var i = 0; i < selection.length; i++) {
      // Colors may also be defined using 140 standard names. The names are
      // case insensitive.
      selection[i].style.color = 'black'
      // The initial keyword can be used on any property to change its values
      // back to what they originally were.
      selection[i].style.fontWeight = 'initial'
    }
  }
}

export { Mod3Class }
