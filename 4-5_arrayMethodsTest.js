// Demonstrates array methods.
var maids = [ 'Maika', 'Kaho', [ 'Mafuyu', 'Miu' ] ]
var guys = [ 'Dino', 'Koyo' ]

// Note that using + doesn't achieve the same result.
var staff = maids.concat(guys)
console.log('concat:', staff)
// Combines array elements into a string.
console.log('join:', staff.join('___'))
// Adds element.
staff.push('Hideri')
console.log('push:', staff)
// Removes last element and returns it.
console.log('pop:', staff.pop())
// Adds element to front of array and returns array.length.
console.log('unshift:', staff.unshift('Hideri'))
// Same as pop() but the first element.
console.log('shift:', staff.shift())
// Returns section of array as a new array. Does not affect original.
console.log('slice:', staff.slice(3, 5))
// splice(index, n, ...newElements) removes n elements from an array
// starting from index and replaces them with newElements.
// It then returns the removed elements.
console.log('splice:', staff.splice(2, 1, 'Mafuyu', 'Miu'))
console.log('spliced array:', staff)
console.log('reverse:', staff.reverse())
console.log('sort:', staff.sort())
