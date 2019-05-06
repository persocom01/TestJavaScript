// It is possible to define an array with an empty element, unlike python.
// However, in practice, it is best to use undefined for empty elements.
var arr = [1, , 3, undefined, 5]
console.log(arr)
// Deleting an array element doesn't shrink the array.
delete arr[4]
console.log(arr)
// The difference between an empty element and an undefined element
// is undefined returns true if checked.
console.log('empty element:', 1 in arr)
console.log('undefined element:', 3 in arr)
console.log()

// Demonstrates combining two array together using the ... operator.
var guys = [ 'Dino', 'Koyo' ]
var maids = [ 'Maika', 'Kaho', ...guys ]
// Demonstrates assigning multiple variables to array elements in a single line.
var [ smile, sweet, ...service ] = maids
console.log(smile, sweet, service)
// Demonstrates use of the in operator, which returns a boolean based on whether
// the oject property exists.
// For arrays, it accept arry indexes and not values themselves.
console.log('index:', 0 in maids)
console.log('value:', 'Maika' in maids)
