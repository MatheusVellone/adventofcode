const { runTest } = require('../../lib/helper')

const tests = [
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

const solution = (input) => {
  let result = 0
  input.split('')
    .forEach((char) => {
      if (char === '(') {
        result += 1
      } else if (char === ')') {
        result -= 1
      }
    })
  return result
}

runTest(solution, tests, __dirname)
