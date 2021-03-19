// Demonstrates 3 types of loops, for, while and do while.
var letters = ['a', 'b', 'c', 'd', 'e']

// For loop.
function printAll (arr) {
  var arrForward = []
  var arrReverse = []
  // For loops accept up to 3 statements as arguments, start, end and step.
  // The 2nd and 3rd arguments are options, but without them, if break and
  // stepVar++ must be somewhere within the loop itself.
  // Demonstrates using two variables in a for loop. Note that only one
  // variable needs to be the break condition.
  for (var i = 0, i2 = arr.length - 1; i < arr.length; i++, i2--) {
    // arrForward.push(arr[i])
    arrReverse.push(arr[i2])
  }
  // If you just wish to go through the whole array, for... in or for... of
  // loops can be used instead. These loops don't require defining start, stop
  // and step arguments.
  // The python equivalent for for... in is: for i in range(arr)
  // The python equivalent for for... of is: for e in arr
  for (var i3 in arr) {
    arrForward.push(arr[i3])
  }
  console.log('forward:', arrForward.join(''))
  console.log('reverse:', arrReverse.join(''))
}

// while loop with continue. Continue, which restarts the loop when its
// condition is met.
// In this case, continue causes the loop to restart after skipping vowels.
function noVowels (arr) {
  var vowels = ['a', 'e', 'i', 'o', 'u']
  var arr2 = []
  var i = 0
  while (i < arr.length) {
    // vowels.indexOf(string) returns -1 if string is not found.
    if (vowels.indexOf(arr[i]) > -1) {
      i++
      continue
    }
    arr2.push(arr[i])
    i++
  }
  console.log('non vowels:', arr2.join(''))
}

// do while loop with break. Break ends the loop if its condition is met.
// In this case, break causes the loop to break when the letter specified is
// encountered.
function stopAtLetter (letter, arr) {
  var i = 0
  var arr2 = []
  do {
    arr2.push(arr[i])
    if (arr[i] === letter) {
      break
    }
    i++
  } while (i < arr.length)
  console.log('up to letter ' + letter + ':', arr2.join(''))
}

printAll(letters)
noVowels(letters)
stopAtLetter('d', letters)
console.log()

// Demonstrates other types of for loops.
var fruits = ['apple', 'banana', 'orange']
var fruitBox = { fruit: 'mango', origin: 'mexico' }
var str = ''
var letterSum = 0

// for... in loop like the one at the beginning.
// Remember that it works with indexes and not the elements themselves.
for (var i in fruits) {
  str += i
}
console.log('for in array:', str)

// for... in also works on object keys. However, it will also return the keys
// of the object prototype, so if (object.hasOwnProperty(key)) {} is needed.
// The prefered way to iterate over object keys is for... of on
// Object.keys(object)
str = ''
for (var k in fruitBox) {
  if (fruitBox.hasOwnProperty(k)) {
    str += k + ' '
  }
}
console.log('for in object:', str)

// for... of loop.
// This loop sums the number of letters in the array.
// for... of returns each element in the array instead of just the index.
letterSum = 0
for (var fruit of fruits) {
  letterSum += fruit.length
}
console.log('for of array:', letterSum)

// One cannot use for... of directly on an object, but one can specifically
// turn an object into an array using Object.keys(object),
// Object.values(object) or Object.entries(object).
str = ''
for (var v of Object.values(fruitBox)) {
  str += v + ' '
}
console.log('for of object:', str)

// Alternative way to write for... in and for... of loops.
str = ''
letterSum = 0
// Arrow functions can also be used, but in this case the loop doesn't return anything.
fruits.forEach((fruit, i) => {
  str += i
  letterSum += fruit.length
})
console.log('for each:', str, letterSum)
console.log()

// One disadvantage of .forEach() is the inability to break the loop. If break
// is desired, use

// Demonstrates how to loop through nested objects.
var party = [
  {
    name: 'Parn',
    role: 'swordsman',
    race: 'human'
  },
  {
    name: 'Deedlit',
    role: 'archer',
    race: 'elf'
  }
]
console.log('party members:')
for (var { name: n, role: ro, race: ra } of party) {
  console.log(n + ' the ' + ra + ' ' + ro)
}

// loop labels are not covered since their use is discouraged.
