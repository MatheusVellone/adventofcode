const { runTest } = require('../../lib/helper')

const tests = [
  [')', 1],
  ['()())', 5],
]

const solution = (input) => {
  let acc = 0
  let result = 0

  input.split('')
    .forEach((char, index) => {
      if (char === '(') {
        acc += 1
      } else if (char === ')') {
        acc -= 1
      }

      if (acc === -1 && !result) {
        result = index + 1
      }
    })

  return result
}

runTest(solution, tests, __dirname)
