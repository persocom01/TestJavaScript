// Demonstrates various ways to create and manipulate arrays in JS.

// It is possible to define an array with an empty element, unlike python.
// However, in practice, it is best to use undefined for empty elements.
var arr = [1, , 3, undefined, 5]
console.log(arr)
// Deleting an array element doesn't shrink the array.
delete arr[4]
console.log(arr)
// The difference between an empty element and an undefined element
// is undefined behaves like a filled element under certain checks.
console.log('empty element:', 1 in arr)
console.log('undefined element:', 3 in arr)
// Using a non integer index creates an array property instead of array element.
arr[1.5] = ['array', 'property']
console.log('property:', Object.prototype.hasOwnProperty.call(arr, 1.5), '\nvalue:', arr[1.5])
// Does not list empty keys, but does list properties.
console.log(Object.keys(arr))
// Ignores empty keys.
console.log([...arr.keys()])
console.log()

// Demonstrates combining two array together using the ... operator.
var guys = ['Dino', 'Koyo']
var maids = ['Maika', 'Kaho', ...guys]
// Demonstrates assigning multiple variables to array elements in a single line.
var [smile, sweet, ...service] = maids
console.log(smile, sweet, service)
// Demonstrates use of the in operator, which returns a boolean based on whether
// the object property exists.
// For arrays, it accept array indexes and not values themselves.
console.log('index:', 0 in maids)
console.log('value:', 'Maika' in maids)
console.log()

// JS has no list comprehensions. Use things like map and filer methods instead.
var attrib = ['smile', 'sweet', 'service', 'service']
var i = 0
// Returns a new array after running array elements through a function.
var maidAttributes = attrib.map(x => x + ': ' + maids[i++])
console.log('map:', maidAttributes)
// Returns a new array comprising elements of the original that returned true
// through a function.
var girlsOnly = maidAttributes.filter(x => x.indexOf('service') === -1)
console.log('filter:', girlsOnly)
console.log()

// JS also has no range() function. To generate an array range, use:
// Array(5) creates an empty array with length 5.
var range5 = [...Array(5).keys()]
console.log('range:', range5)
console.log()

// Demonstrates 2d arrays.
var numpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
var reduceRow = (a, c) => [...a, c]
for (var num in numpad) {
  // Each element in a 2d array is called using array[row][column].
  console.log('2d array row ' + (+num + 1) + ':', numpad[num].reduce(reduceRow, []))
}

// Demonstrates calling array methods on array-like objects for which said
// methods are normally unusable.
var string = ''
Array.prototype.forEach.call(maids[0], function (name) {
  string += '-' + name
})
// Slice is used to eliminate the first character.
console.log('array method on string:', string.slice(1))
