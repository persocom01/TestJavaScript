// Maps objects work like normal objects with a few key differences.
var myMap = new Map()

// The first difference is that you may use objects and functions as keys
// and not just strings.
var keyObj = { currency: 'USD' }
var keyFunc = x => ++x
// Map objects always iterate their elements in insertion order.
myMap.set(keyObj, 'first value')
myMap.set(keyFunc, 'second value')
myMap.set(123456, 'third value')

// Demonstrates various map methods.
console.log('size:', myMap.size)
console.log('get:', myMap.get(keyObj))
console.log('has:', myMap.has(123456))
myMap.delete(123456)
for (var [key, value] of myMap) {
  console.log(key + ': ' + value)
}
myMap.clear()

// Weakmaps are another object-like object.
// Weakmaps may only take objects as keys.
// There is no way to list the keys in a WeakMap object
var confidential = new WeakMap()
function Maid () {
  const idealBHW = [90, 60, 90]
  confidential.set(this, idealBHW)
}
Maid.prototype.bhw = function () {
  return confidential.get(this)
}
// Confidential is not exported with the module.
module.exports = Maid
