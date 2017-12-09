const path = require('path')
const fs = require('fs')
const { green, red, bold } = require('chalk')

const expectedErrorMessage = (expected, received, input = false) => {
  return red(`Expected ${bold(expected)} but got ${bold(received)}${input ? ` for input ${bold(input)}` : ''}`)
}
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
        return expectedErrorMessage(expectedOutput, output, input)
      }
      return false
    })
    .filter(error => error)

  if (errors.length) {
    console.log(errors.join('\n'))
    return false
  }

  return true
}

const runTest = (year, day, part) => {
  const dirname = path.join(__dirname, year.toString(), day.toString())
  const filename = path.join(dirname, `part${part}.js`)

  if (!fs.existsSync(filename)) {
    return
  }

  const { solution, tests, expectedResult } = require(filename)
  if (!validate(solution, tests)) {
    return
  }

  const input = loadTestInput(dirname)
  const result = solution(input)
  const challengeIdentifier = `${bold(year)}-${bold(day)}_${bold(part)}`

  if (!expectedResult) {
    console.log(`${challengeIdentifier} = ${bold(result)}`)
  } else {
    if (result === expectedResult) {
      console.log(`${challengeIdentifier}: ${bold(green('OK'))}`)
    } else {
      console.log(`${challengeIdentifier}: ${expectedErrorMessage(expectedResult, result)}`)
    }
  }

}

const allYears = [2015, 2016, 2017]
const allDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
const allParts = [1, 2]

let [, , years = allYears, days = allDays, parts = allParts] = process.argv

if (!Array.isArray(years)) {
  years = [years]
}
if (!Array.isArray(days)) {
  days = [days]
}
if (!Array.isArray(parts)) {
  parts = [parts]
}

years.forEach((year) => {
  days.forEach((day) => {
    parts.forEach((part) => {
      runTest(year, day, part)
    })
  })
})
