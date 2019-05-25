// A set is similar to an array, but with the unique property whereby
// values in the set may only occur once.
var arr = [ 1, 2, 2, 4 ]
var mySet = new Set(arr)

// .length doesn't work with sets. .size must be used instead.
console.log(mySet)
console.log('size:', mySet.size)
console.log('add:', mySet.add(5))
var n = 5
// Returns false if value does not exist.
console.log('delete ' + n + ':', mySet.delete(n))
console.log()

// Returns an array that when iterated over, returns [value, value] for each
// set element in insertion order. If you want value, use .keys() instead.
var iter = mySet.entries()
for (var element of iter) {
  console.log('entries element:', element)
  break
}
var arr2 = []
mySet.forEach(function (x) {
  arr2.push(x)
})
console.log('for each elements:', arr2)
n = 1
console.log('has ' + n + ':', mySet.has(n))
// Like entries with double values.
iter = mySet.keys()
for (element of iter) {
  console.log('keys element:', element)
  break
}
console.log()

console.log('convert to array:', Array.from(mySet))
