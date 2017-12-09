const path = require('path')
const fs = require('fs')
const { green, red, bold } = require('chalk')

const loadTestInput = (dirname) => {
  const inputPath = path.join(dirname, 'input.txt')
  return fs.readFileSync(inputPath, 'utf8')
}

const validate = (solve, tests) => {
  const errors = tests
    .map((test) => {
      const [input, expectedOutput] = test
      const output = solve(input)

      if (expectedOutput !== output) {
        return `Expected ${bold(expectedOutput)} but got ${bold(output)} for input ${bold(input)}`
      }
      return false
    })
    .filter(error => error)

  if (errors.length) {
    console.log(red(errors.join('\n')))
    return false
  }

  console.log(green('All tests validated'))
  return true
}

module.exports.runTest = (solve, tests, dirname) => {
  if (!validate(solve, tests)) {
    return
  }

  const input = loadTestInput(dirname)
  const result = green(solve(input))
  console.log(`The result is: ${result}`)
}
