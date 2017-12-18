module.exports.tests = [
  ['1', 1166642],
  ['11', 1520986],
  ['21', 1982710],
  ['1211', 2584304],
  ['111221', 3369156],
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

  for(let i = 0; i < 50; i++) {
    result = runSolution(result)
  }

  return result.length
}

module.exports.expectedResult = 3579328
