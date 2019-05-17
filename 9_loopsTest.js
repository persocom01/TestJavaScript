// Demonstrates 3 types of loops, for, while and do while.
var alphabet = ['a', 'b', 'c', 'd', 'e']

function printAll (arr) {
  var arrForward = []
  var arrReverse = []
  // For loops have 3 statements, the 2nd and 3rd being optional.
  // Without them, break and i++ must be somewhere within the loop itself.
  // Demonstrates using two variables in a for loop.
  for (var i = 0, i2 = arr.length - 1; i < arr.length; i++, i2--) {
    arrForward.push(arr[i])
    arrReverse.push(arr[i2])
  }
  // Alternative that does not require defining i beforehand.
  // for (var index in arr) {
  //   arrForward.push(arr[index])
  // }
  console.log('forward:', arrForward.join(''))
  console.log('reverse:', arrReverse.join(''))
}

// Demonstrates continue.
// In this case, continue causes the loop to continue without adding vowels
// to the output.
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

// Demonstrates break.
// In this case, break causes the loop to break when the letter
// specified is encountered.
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

printAll(alphabet)
noVowels(alphabet)
stopAtLetter('d', alphabet)
console.log()

// Demonstrates other types of for loops.
var fruits = [ 'apple', 'banana', 'orange' ]
var indexList = ''
var letterSum = 0

// Demonstrates the for... in loop.
// This one lists the array indexes.
for (var i in fruits) {
  indexList += i
}
console.log('for in:', indexList)

// Demonstrates the for... of loop.
// This loop sums the number of letters in the array.
// for... of returns the value of each element in the array instead of just the index.
letterSum = 0
for (var fruit of fruits) {
  letterSum += fruit.length
}
console.log('for of:', letterSum)

// Alternative way to write the above for in loop.
letterSum = 0
// Arrow functions can also be used, but in this case the loop doesn't return anything.
fruits.forEach(function (fruit) {
  letterSum += fruit.length
})
console.log('for each:', letterSum)
console.log()

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
