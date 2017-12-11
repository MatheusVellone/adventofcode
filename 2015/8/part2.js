module.exports.tests = [
  [`""
"abc"
"aaa\\"aaa"
"\\x27"`, 19]
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      result += JSON.stringify(input).length - input.length
    })

  return result
}

module.exports.expectedSolution = 2074
