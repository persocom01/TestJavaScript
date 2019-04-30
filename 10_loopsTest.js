// Demonstrates 3 types of loops.
var alphabet = ['a', 'b', 'c', 'd', 'e']

function printAll (arr) {
  var arr2 = []
  var i
  // For loops have 3 statements, the 2nd and 3rd being optional.
  // Note
  // Without them, break and i++ must be somewhere within the loop itself.
  for (i = 0; i < arr.length; i++) {
    arr2.push(arr[i])
  }
  // Alternative that does not require defining i beforehand.
  // for (var index in arr) {
  //   arr2.push(arr[index])
  // }
  console.log(arr2.join(''))
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
  console.log(arr2.join(''))
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
  console.log(arr2.join(''))
}

printAll(alphabet)
noVowels(alphabet)
stopAtLetter('d', alphabet)
