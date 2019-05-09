// Demonstrates various methods related to date objects.

// Current dates.
var currentDate = Date()
var currentDate2 = new Date()
console.log(currentDate)
console.log(currentDate2)
console.log()

// Various ways to input dates.
var christmasDinner2000string = new Date('December 25, 2000 18:30:30')
// yyyy, mm, dd, hh, mm, ss. Due to reasons in the past, month 0 = Janurary.
var christmasDinner2000number = new Date(2000, 11, 25, 18, 30, 30)
console.log(christmasDinner2000string)
console.log(christmasDinner2000number)
