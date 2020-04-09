// Demonstrates various functions and methods related to the math object.

// 360 degrees = 2PI radians.
console.log('PI:', Math.PI)
console.log('abs value:', Math.abs(-1.6))
console.log()

// Trig functions. Given angle in radians, return ratio.
// sin = opp / hyp.
console.log('sin:', Math.sin(Math.PI / 2))
// cos = adj / hyp.
console.log('cos:', Math.cos(0))
// tan = opp / adj
console.log('tan:', Math.tan(2 * Math.PI / 360 * 45))
console.log()

// Inverse trig functions. Given ratio, returns angle in radians.
console.log('asin:', Math.asin(1))
console.log('acos:', Math.acos(0))
console.log('atan:', Math.atan(1))
// Same as atan but coordinate based.
console.log('atan2:', Math.atan2(2, 2))
console.log()

// Hyperbolic functions.
// console.log('sinh:', Math.sinh())
// console.log('cosh:', Math.cosh())
// console.log('tanh:', Math.tanh())
// console.log('asinh:', Math.asinh())
// console.log('acosh:', Math.acosh())
// console.log('atanh:', Math.atanh())
// console.log()

var list = [...Array(5).keys()]
// pow(base, power). Accepts fractional and negative powers as well.
console.log('pow:', Math.pow(9, 0.5))
// Returns e^number.
console.log('exp:', Math.exp(1))
// Returns e^number - 1.
console.log('expm1:', Math.expm1(1))
console.log('log10:', Math.log10(100))
// Natural log of num + 1. ln1 = 0. Therefore if num = 0, result = 0.
console.log('log1p:', Math.log1p(Math.exp(1) - 1))
console.log('log2:', Math.log2(4))
console.log('floor:', Math.floor(1.9))
console.log('ceil:', Math.ceil(1.1))
// Note that you cannot just pass the list without ....
console.log('min:', Math.min(...list))
console.log('max:', Math.max(...list))
// Works like excel's rand()
console.log('random:', Math.random())
console.log('round:', Math.round(1.5))
// Returns closest float representation of a number. Beats me what use this is.
console.log('fround:', Math.fround(1.05))
// Removes all decimals.
console.log('trunc:', Math.trunc(1234.56))
console.log('sqrt:', Math.sqrt(9))
console.log('cuberoot:', Math.cbrt(27))
// Returns sqrt of the sqares of the arguments passed.
// Useful for the Pythagorean theorem, but you can pass any number of arguments.
console.log('hypot:', Math.hypot(3, 4))
// Returns 1, 0 or -1 based on the sign of the number.
console.log('sign:', Math.sign(-0))

// Stuff relating to 32 bit representation of numbers.
// console.log('clz32:', Math.clz32())
// console.log('imul:', Math.imul())
