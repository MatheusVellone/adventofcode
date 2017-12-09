module.exports.tests = [
  ['2x3x4', 58],
  ['1x1x10', 43],
]

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      const dimensions = input.split('x')
      let smallestArea = Infinity

      for (let i = 0; i < dimensions.length; i++) {
        for (let j = i + 1; j < dimensions.length; j++) {
          const area = dimensions[i] * dimensions[j]
          if (area < smallestArea) {
            smallestArea = area
          }

          result += area * 2
        }
      }

      result += smallestArea
    })

  return result
}

module.exports.expectedResult = 1588178
