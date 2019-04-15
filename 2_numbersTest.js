var i = 0
var y

// Increments have a before and after.
// ++var only adds 1 to var after the statement is complete.
// node.js doesn't have document.write() but instead this.
console.log(++i)
console.log(i--)

// Compound assingment operators.
y = 1
y += 1
y -= 1
y *= 10
y /= 2
console.log('start:', y)
