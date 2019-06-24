// Demonstrates exporting modules.
// You may export variables and functions using the export keyword.
// export must be top level and cannot be used inside stuff like functions.
function sayHi () {
  console.log('hi')
}
var name = 'mod1'

// You may export things that depend on things that are not exported.
export var mod1 = `import from ${name} sucessful.`
// While you may export items individually, it is likely better to do your
// exporting at the end of the file as a kind of array.
// Using as allows you to rename the object being exported.
export { sayHi as mod1Fun }

// // node.js does not use the export keyword but instead a module.exports object.
// // Demonstrates how to rename exports in node.js.
// module.exports = { mod1Fun: sayHi }
