// Templates provide more functionality to string construction.

// They use ` the mark below ~ instead of '.
var temp = `
templates
can be
multiline
`
console.log(temp)

// Demonstrates output formatting.
var suspect = 'Thomas'
var place = 'mall'
var temp2 = `The detective spotted ${suspect} at the ${place}.`
console.log(temp2)

// \n and \r are actually pretty much identical.
// I don't think \v has practical use.
var specialCharacters = `
\0 Null Byte
\b Backspace
\f Form feed
\n New line
\r Carriage return
\t Tab
\v Vertical tab
\' Apostrophe or single quote
\" Double quote
\\ Backslash character
\u03A9 Unicode special character
`
console.log(specialCharacters)

// You may use String.raw to escape special characters but keep substitutions.
var insertText = 'raw string substitution.'
var rawString = String.raw`
\0 Null Byte
\b Backspace
${insertText}
\f Form feed
\n New line
`
console.log('raw string:', rawString)
