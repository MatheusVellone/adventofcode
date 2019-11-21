module.exports.tests = [
  ['+1', 1],
  ['-2', -2],
  ['+3', 3],
  ['+1', 1],
]

module.exports.solution = (input) => {
  return input
    .split('\n')
    .map(Number)
    .reduce((total, current) => total + current, 0)
}

module.exports.expectedResult = 510
