var i = 0
var x

// Increments have a before and after.
// ++var only adds 1 to var after the statement is complete.
// node.js doesn't have document.write() but instead this.
console.log(++i)
console.log(i--)

// Compound assingment operators.
x = 1
x += 1
x -= 1
x *= 10
x /= 2
console.log('start:', x)
x **= 2
console.log('power:', x)
x %= 2
console.log('remainder:', x)
console.log()

// Comparision operators.
console.log("1 == '1'", 1 == '1')
// === checks for type.
console.log("1 === '1'", 1 === '1')
console.log("1 != '1'", 1 != '1')
console.log("1 !== '1'", 1 !== '1')
console.log("1 > '1'", 1 > '1')
console.log("1 >= '1'", 1 >= '1')
console.log()

// Logical operators are covered under if statements.
// Conditional opeartor is under variables.

// The types of typeof are:
// 'number', 'string', 'boolean', 'undefined', 'object', 'symbol'.
// null is considered an object.
console.log(typeof x)
