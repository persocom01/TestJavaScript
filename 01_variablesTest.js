// Javascript files are .js when independant of html files.
/* Multiline comments
are written this way. */

// Variable names can start with $, and multiple variables can be defined at
// the same time. ; is necessary if code is written on same line, but for
// readability purposes it's better not to write code on the same line.
// Variables with no value === undefined.
// However, if you use them in math they return NaN (not a  number).
// NaN is a special object property that !== 'NaN'.
// To determine if the value is NaN, use isNaN(value) or Number.isNaN(value).
// isNaN() will evaluate all non-numbers as NaN.
// Number.isNaN() will only evaluate NaN as NaN.
// document.querySelector('selector') takes in CSS Selectors as argument.
// For a full list go to https://www.w3schools.com/cssref/css_selectors.asp
// In this case #NaN selects the first element with id="NaN".
var $text, homeButtonText; document.querySelector('#NaN').textContent = $text + 1
homeButtonText = document.querySelector('#homeButton')
homeButtonText.textContent = 'Home'

// Variables can be declared and given a value immediately.
var boo = 123
// Demonstrates a conditional variable.
// The format is condition ? valIfTrue : valIfFalse.
var chkBoo = (typeof boo !== 'boolean') ? 'variable boo is not a boolean' : boo
document.querySelector('#boolean').textContent = chkBoo

// The let variable is a local version of var that only works in {} blocks.
// The const variable is the same as let but read only. It is recommended for
// use if the variable is never reassigned.
// const object properties and array contents are however, not protected.
if (true) {
  const x = 5
}

if (typeof x === 'undefined') {
  document.querySelector('#let').textContent = 'let x is a local variable.'
} else {
  document.querySelector('#let').textContent = x
}

// Variables can also be defined as functions using function expressions.
// This is covered under the functions chapter.
