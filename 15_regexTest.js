// Demonstrates use of regex in js.

var text = 'Ice man ate ice-cream at the ice ring while wielding ice bringer.'

// Regex literals are indicated by the brackets /regex/.
var re = /ice[- ](?<suffix>\w+)/gmi
// 4 methods work with regex: match, search, replace and split.
// There is also matchAll, but it doesn't work on node.js.
console.log('match:', text.match(re))
console.log('\n')

// Alternatively, you may use a regex object.
// However, special characters require double escapes \\ instead of \.
var reObj = new RegExp('ice[- ](?<suffix>\\w+)', 'gmi')
// console.log('reObj:', reObj.exec(text))
// Alternatively, use String.raw.
var reObjAlt = new RegExp(String.raw`ice[- ](?<suffix>\w+)`, 'gmi')
// You may also convert a regex literal to a regex object using the source method.
// However, this method does not preserve modifiers.
reObj = new RegExp(re.source, 'gmi')
// console.log('reObj:', reObj.exec(text))

var reStr = re.toString()
// Regex objects are capable of two methods not available to strings.
// The first is exec, which returns an array of information on a single match.
var reParts = /\/(.*)\/(\w+)/.exec(reStr)
console.log('exec:', reParts)
console.log()

// Demonstrates the fully converted regex literal into a regex object.
reObj = new RegExp(reParts[1], reParts[2])
console.log('reObj:', reObj.exec(text))
// This alt is just to demonstrate the two are functionally equivalent.
console.log('reObjAlt:', reObjAlt.exec(text))
console.log('test:', reObj.test(text))
console.log()

var text2 = 'C:\\'

function escapeRegExp (string) {
  // $& means the whole matched string.
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

console.log(escapeRegExp(text2))
