// JavaScript files have extension .js when independant of html files.
/* Multiline comments
are written this way. */

// Variable names can start with $, and multiple variables can be defined at
// the same time. ; is necessary if code is written on same line, but for
// readability purposes it's better not to write code on the same line.
// Variables with no value === undefined.
// undefined when used with math operators will return NaN (not a  number).
// NaN is a special object property !== 'NaN'.
// To determine if the value is NaN, use isNaN(value) or Number.isNaN(value).
// isNaN() will evaluate all non-numbers as NaN.
// Number.isNaN() will only evaluate NaN as NaN.
// document.querySelector('selector') takes in CSS Selectors as argument.
// For a full list go to https://www.w3schools.com/cssref/css_selectors.asp
// In this case #NaN selects the first element with id="NaN".
var $text, title; document.querySelector('#NaN').textContent = $text + 1

title = document.querySelector('h1')
// .textContent inserts text into the label without recognizing html. If you
// wish to write html into the label, use .innerHTML instead.
// .innerText is similar to .textContent but when used to get the contents of
// a label though document.querySelector(), does not return the contents of
// script and style elements. It also notably does not return text that has
// been hidden by <span style="display:none;">
title.innerText = 'JavaScript test page'

// Variables can be declared and given a value immediately.
var boo = 123
// Demonstrates a conditional variable.
// var = condition ? valIfTrue : valIfFalse.
// If one only needs a boolean true/false value returned, one can shorten to:
// var = condition
var chkBoo = (typeof boo === 'boolean') ? boo : 'variable boo is not a boolean'

document.querySelector('#boolean').textContent = chkBoo

// The let variable is a local version of var that only works in {} blocks.
// The const variable is the same as let but read only. It is recommended for
// use if the variable is never reassigned.
// const object properties and array contents are however, not protected.
if (true) {
  const x = 5
}

if (typeof x === 'undefined') {
  document.querySelector('#const').textContent = 'const x is a local variable.'
} else {
  document.querySelector('#const').textContent = x
}

// Variables can also be defined as functions using function expressions.
// This is covered under the functions chapter.

window.VariablesTest = 1
