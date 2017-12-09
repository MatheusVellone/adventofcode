module.exports.tests = [
  ['qjhvhtzxzqqjkmpb', 1],
  ['xxyxx', 1],
  ['uurcxstgmygtbstg', 0],
  ['ieodomkazucvgmuy', 0],
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      const hasRepeatingPair = input.match(/(..).*\1+/g)
      const repeatWithAnotherInBetween = input.match(/(.).\1/g)

      const valid = hasRepeatingPair && repeatWithAnotherInBetween

      if (valid) {
        result += 1
      }
    })

  return result
}

module.exports.expectedResult = 55
