module.exports.tests = [
  [`""
"abc"
"aaa\\"aaa"
"\\x27"`, 12]
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      result += input.length - eval(input).length
    })

  return result
}
