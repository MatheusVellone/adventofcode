module.exports.tests = [
  ['1', 82350],
  ['11', 107312],
  ['21', 139984],
  ['1211', 182376],
  ['111221', 237746],
]

const runSolution = (input) => {
  let current = input[0]
  let result = ''
  let count = 0

  input.split('')
    .forEach((char) => {
      if (char === current) {
        count += 1
      } else {
        result += count + current

        current = char
        count = 1
      }
    })
  result += count + current
  return result
}

module.exports.solution = (input) => {
  let result = input

  for(let i = 0; i < 40; i++) {
    result = runSolution(result)
  }

  return result.length
}

module.exports.expectedResult = 252594
