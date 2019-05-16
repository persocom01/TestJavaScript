// Demonstrates use of regex in js.

var text = 'Iceman, wielding ice chunchunmaru, ate ice-cream at the ice ring while watching The Ring.'

// Regex literals are indicated by the brackets /regex/.
var re = /\bice[- ]?(?<suffix>\w+)/gmi
// 4 methods work with regex: match, search, replace and split.
// There is also matchAll, but it doesn't work on node.js.
console.log('match:', text.match(re))
console.log('\n')

// Alternatively, you may use a regex object.
// However, special characters require double escapes \\ instead of \.
var reObj = new RegExp('\\bice[- ]?(?<suffix>\\w+)', 'gmi')
// console.log('reObj:', reObj.exec(text))
// Alternatively, use String.raw.
var reObjAlt = new RegExp(String.raw`\bice[- ]?(?<suffix>\w+)`, 'gmi')
// This alt is just to demonstrate the two are functionally equivalent.
console.log('reObjAlt:', reObjAlt.exec(text))
// You may also convert a regex literal to a regex object using the source method.
// However, this method does not preserve modifiers.
reObj = new RegExp(re.source, 'gmi')
// console.log('reObj:', reObj.exec(text))
console.log()

var reStr = re.toString()
// Regex objects are capable of two methods not available to strings.
// The first is exec(), which returns an array of information on a single match.
var reParts = /\/(.*)\/(\w+)/.exec(reStr)
console.log('exec:', reParts)
console.log()

// Demonstrates the fully converted regex literal into a regex object.
reObj = new RegExp(reParts[1], reParts[2])
var arr
// One feature of exec() is that lastIndex is updated every time a match is found.
// Therefore if exec() is run multiple times, the result will be different.
while ((arr = reObj.exec(text)) !== null) {
  console.log(`Found ${arr[0]}. Next starts at ${reObj.lastIndex}.`)
}
// A faster way to determine if a pattern exists in a string is the test() method.
// The method also updates lastIndex, so in theory you can loop with it just like exec().
console.log('test:', reObj.test(text))
console.log()

// Explaination various re below:
// ^regex$ ^ and $ used this way are called anchors. They represent the start
// and end of a string. \b can be used instead for start of a word.
// (?!<) is called negative lookbehind. It ensures that the text in the brackets
// is not behind the text after it.
// Replacing ! with = makes it positive. (?=<) is positive lookbehind.
// (?=) is lookahead.
// ? = 0-1. + = 1+. * = 0+.
// \b means word boundary. Other common ones are \d number, \s whitespace, \w word.
// A capital \B means the opposite of \b.
// \. escapes .. Other characters needing escape are \+*?[]^$(){}=!<>|:-.
// The gmi after the last / are flags. g = global. i = case insensitive.
// m = multi=line. s = dotall. y = start search from lastIndex position.
var nonIceRing = /(?<!ice )\bring\b/gmi
console.log('non ice ring:', text.match(nonIceRing))
console.log()

// Demonstrates use of regex groups.
// () denotes a group. match() will return groups under match()[1] onward.
// To backreference groups in the regex use \groupnumber.
// (?<name>) denotes a named group. To call the named group used match().groups.name.
// If optional named groups are used (?<name>)?, the group === undefined when not found.
// To backreference named groups in the regex use \k<name>.
// (?:) is used to make it a group non capturing.
// [a-z] specifies all the possible characters accepted.
// [^a-z] specifies all the possible characters rejected.
// {min,max} specifies the min and max number of repetitions of the previous char.
var groupMatch = /\b(\w+) ice(?:[- ])(?<suffix>\w+)\k<suffix>(?<suffix2>\w+)/i
console.log('group match:', text.match(groupMatch))
console.log('unnamed match:', text.match(groupMatch)[1])
console.log('named match:', text.match(groupMatch).groups.suffix)
console.log()

// In replace, $1 indicates the first group. $<name> is used for named groups.
// Name groups can still be referenced by number based on position.
// In this instance, $2 does the same thing as $<suffix>.
// Replace has other special $ characters. To insert an actual $, use $$.
// $& = matched string. $` = stuff before matched string. $' = stuff after matched string.
var fireSword = text.replace(groupMatch, '$`$1 fire $2$<suffix>$<suffix2>')
console.log('group replace:', fireSword)
// Demonstrates how pass a function to replace to do the same thing as the above.
function fireSwordReplacer (match, p1, p2, p3, offset, string) {
  return string.slice(0, offset) + p1 + ' fire ' + p2 + p2 + p3
}
fireSword = text.replace(groupMatch, fireSwordReplacer)
console.log('function replace:', fireSword)
