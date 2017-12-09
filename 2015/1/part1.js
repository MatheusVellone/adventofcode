module.exports.tests = [
  ['(())', 0],
  ['()()', 0],
  ['(((', 3],
  ['(()(()(', 3],
  ['))(((((', 3],
  ['())', -1],
  ['())', -1],
  [')))', -3],
  [')())())', -3],
]

module.exports.solution = (input) => {
  let result = 0

  input.split('')
    .forEach((char, index) => {
      if (char === '(') {
        result += 1
      } else if (char === ')') {
        result -= 1
      }
    })

  return result
}

module.exports.expectedResult = 74
