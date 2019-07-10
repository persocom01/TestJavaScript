// Javascript files are .js when independant of html files.
/* Multiline comments
are written this way. */

// variable names can start with $
var $text
// Variables with no value === undefined.
// However, if you use them in math they return NaN (not a  number).
// NaN is a special object property that isn't === 'NaN'.
// To determine if the value is NaN, use isNaN(value) or Number.isNaN(value).
// isNaN() will evaluate all non-numbers as NaN.
// Number.isNaN() will only evaluate NaN as NaN.
document.querySelector('#NaN').textContent = $text + 1

// document.querySelector('selector') takes in CSS Selectors as argument.
// In this case #name selects the first element with id="name".
$text = document.querySelector('#text')
$text.textContent = 'It\'s a test'

// Variables can be declared and given a value immediately.
var boo = 123
// Demonstrates a conditional variable.
// The format is condition ? valIfTrue : valIfFalse.
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
  document.querySelector('#let').textContent = 'let x is a local variable.'
} else {
  document.querySelector('#let').textContent = x
}

// Variables can also be defined as function using function expressions.
// This is covered under the functions chapter.
