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

// pow(base, power). Accepts fractional and negative powers as well.
console.log('pow:', Math.pow(9, 0.5))
// Returns e^number.
console.log('exp:', Math.exp(1))
// Returns e^number - 1.
console.log('expm1:', Math.expm1(1))
console.log('log10:', Math.log10(10))
console.log('log1p:', Math.log1p())
console.log('log2:', Math.log2())
console.log('floor:', Math.floor())
console.log('ceil:', Math.ceil())
console.log('min:', Math.min())
console.log('max:', Math.max())
console.log('random:', Math.random())
console.log('round:', Math.round())
console.log('fround:', Math.fround())
console.log('trunc:', Math.trunc())
console.log('sqrt:', Math.sqrt())
console.log('cbrt:', Math.cbrt())
console.log('hypot:', Math.hypot())
console.log('sign:', Math.sign())
console.log('clz32:', Math.clz32())
console.log('imul:', Math.imul())
