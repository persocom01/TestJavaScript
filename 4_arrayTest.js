// It is possible to define an array with an empty element, unlike python.
// However, in practice, it is best to use undefined for empty elements.
var arr = [1, , 3, undefined, 5]
console.log(arr)
console.log()

// Demonstrates assigning multiple variables to array elements in a single line.
var maids = [ 'Maika', 'Kaho', 'Dino', 'Koyo' ]
var [ smile, sweet, ...service ] = maids
console.log(smile, sweet, service)
