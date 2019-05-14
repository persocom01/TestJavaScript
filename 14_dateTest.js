// Demonstrates various methods related to date objects.

// Current dates.
var currentDateStr = Date()
var currentDate = new Date()
// Note that currentDateStr is not a date object, but a string.
console.log(currentDateStr)
console.log(currentDate)
// Demonstrates how to format a date object into a customized string.
var options = { year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short' }
var localDate = new Intl.DateTimeFormat('en-US', options).format(currentDate)
console.log('en-US date format:', localDate)
console.log()

// Various ways to input dates.
var christmas2000str = new Date('December 25, 2000 18:35:35:550')
// yyyy, mm, dd, hh, mm, ss, mss. Due to reasons in the past, month 0 = Janurary.
var christmas2000num = new Date(2000, 11, 25, 18, 35, 35, 550)
console.log(christmas2000str)
console.log(christmas2000num)
console.log()

// Demonstrates how to set various parameters of a date object.
// For each set function, there is a get founction, but there is no setDay().
var newDate = new Date(0)
console.log('base date:', newDate)
// Note that if you set year 2000,the time is actually 31 Dec 1999 23:59.
// If you use getFullYear, you will get 2000 instead of 1999 though.
newDate.setFullYear(2000)
console.log('set year:', newDate)
// Note that day is set at the same time as month.
newDate.setMonth(11, 25)
console.log('set mth:', newDate)
// When you use getDay(), it returns the day of the week, not the day of the month.
// 0 starts from Sunday.
console.log('get day:', newDate.getDay())
newDate.setHours(18)
console.log('set hr:', newDate)
newDate.setMinutes(35)
console.log('set min:', newDate)
newDate.setSeconds(35)
console.log('set sec:', newDate)
newDate.setMilliseconds(550)
console.log('set ms:', newDate)
console.log()

// Demonstrates duplication of a date object.
var currentChristmas = new Date(christmas2000str)
currentChristmas.setFullYear(currentDate.getFullYear())
console.log('Christmas date:', currentChristmas)
// Demonstrates getting time difference in days.
var msPerDay = 24 * 60 * 60 * 1000
// Differences are always in milliseconds.
var daysTillChristmas = Math.round((currentChristmas - currentDate) / msPerDay)
console.log('days till Christmas:', daysTillChristmas)
