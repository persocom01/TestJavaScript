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
// Demonstrates sorting by function.
// A function has to take 2 arguments, previous and current, compare them,
// and return a number as to whether previous is before or after current.
var sortByNameLength = function functionName (a, b) {
  // When a is shorter than b, return -1 (a is before b).
  if (a.length < b.length) {
    return -1
  }
  if (a.length === b.length) {
    return 0
  }
  if (a.length > b.length) {
    return 1
  }
}
console.log('sort with function:', staff.sort(sortByNameLength))
// Returns the index of an array element.
console.log('index:', staff.indexOf('Kaho'))
// Does the same as above, but in the case where mutliple elements have
// the same value, returns the index of the lastmost elment.
console.log('last index:', staff.lastIndexOf('Kaho'))
// array.forEach() is covered under loops.
// array.map() and array.filter() are covered in arrayTest.
// Returns true if all elements return true through a function.
console.log('every:', staff.every(x => typeof x === 'string'))
// Returns true if one or more elements return true through a function.
console.log('some:', staff.some(x => x.length >= 5))
console.log()

// Reduce sums all elements (currentValue) of the array into a single value
// (accumulator). In this case an initial value of 0 is provided or else
// this method will start with the first array element.
var reduceSum = (accumulator, currentValue) => accumulator + currentValue.length
console.log('reduce sum:', staff.reduce(reduceSum, 0))
var reduceFlatten = function (a, c) {
  console.log(typeof [...c])
  if ([...c][1] === undefined) {
    [...a].push(c)
  } else {
    [...a].concat([...c])
  }
  return [...a]
}
console.log('reduce flatten:', maids.reduce(reduceFlatten))
