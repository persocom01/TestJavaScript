// A set is similar to an array, but with the unique property whereby
// values in the set may only occur once.
var arr = [ 1, 2, 2, 3 ]
var mySet = new Set(arr)

// .length doesn't work with sets. .size must be used instead.
console.log(mySet)
console.log('size:', mySet.size)
