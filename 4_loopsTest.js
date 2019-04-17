// Demonstrates loops.
var arr = ['mary', 'had', 'a', 'little', 'lamb']
var i

// For loops have 3 statements, the 2nd and 3rd being optional.
// Without them, break and i++ must be somewhere within the loop itself.
for (i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

while (i > 0) {
  i--
  console.log(arr[i])
}
