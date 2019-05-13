// Demonstrates use of regex in js.

var text = 'Ice man ate ice-cream at the ice ring while wielding ice bringer.'

// Regex literals are indicated by the brackets /regex/.
var re = /ice[- ]\w+/gmi
// 4 methods work with regex: match, search, replace and split.
// There is also matchAll, but it doesn't work on node.js.
console.log('match:', text.match(re))

// Alternatively, you may use a regex object.
// However, special characters require double escapes \\ instead of \.
var reObj = new RegExp('ice\\s\\w+', 'gmi')
// Regex objects are capable of two methods not available to strings.
console.log('exec:', reObj.exec(text))
// Alternatively, use String.raw.
var reObjAlt = new RegExp(String.raw`ice[- ]\w+`)
console.log('match:', reObjAlt.exec(text))

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

var raw = String.raw`ice[- ]\w+`
console.log(escapeRegExp(raw))

// Regex object are capable of two methods not available to strings:
console.log(reObj.test(text))
