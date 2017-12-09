module.exports.tests = [
  ['2x3x4', 34],
  ['1x1x10', 14],
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      const [n1, n2, n3] = input.split('x')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a > b)

      result += 2 * (n1 + n2)
      result += n1 * n2 * n3
    })

  return result
}

module.exports.expectedResult = 3783758
