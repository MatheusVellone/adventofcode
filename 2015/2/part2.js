module.exports.tests = [
  ['2x3x4', 34],
  ['1x1x10', 14],
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      const [ls, hs, cs] = input.split('x')

      const l = parseInt(ls)
      const h = parseInt(hs)
      const c = parseInt(cs)

      result += 2 * (l + h)
      result += l * h * c
    })

  return result
}

module.exports.expectedResult = 3798106
