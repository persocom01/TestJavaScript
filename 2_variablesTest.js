// Javascript files are .js when independant of html files.
/* Multiline comments
are written this way. */

// variable names can start with $
var $text

// document.querySelector('selector') takes in CSS Selectors as argument.
// In this case #name selects the first element with id="name".
$text = document.querySelector('#text')
$text.textContent = 'It\'s a test'

// Variables can be declared and given a value immediately.
var boo = 123
// Demonstrates a conditional variable.
var chkBoo = (typeof boo !== 'boolean') ? 'variable boo is not a boolean' : boo
// Demonstrates skipping the var = document.querySelector().
document.querySelector('#boolean').textContent = chkBoo

// Demonstrates the let variable, which only works in the {} block.
// The last variable, const is the same as let but read only.
// const object properties and array contents are however, not protected.
if (true) {
  let x = 5
}

if (typeof x === 'undefined') {
  document.querySelector('#let').textContent = 'x is undefined.'
} else {
  document.querySelector('#let').textContent = x
}
