// Demonstrates exporting modules.
// You may export variables and functions using the export keyword.
// export must be top level and cannot be used inside stuff like functions.
function sayHi () {
  console.log('hi')
}

export var mod1 = 'import from module 1 sucessful.'
// While you may export items indicidually, it is likely better to do your
// exporting at the end of the file as a kind of array.
export { sayHi }

// // node.js does not use the export keyword but instead a module.exports object.
// module.exports = { sayHi }
