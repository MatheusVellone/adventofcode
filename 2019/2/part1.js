module.exports.tests = [
  // ['1,0,0,0,99', 2],
  // ['2,3,0,3,99', 2],
  // ['2,4,4,5,99,0', 2],
  // ['1,1,1,4,99,5,6,0,99', 30],
]

module.exports.solution = (input) => {
  const inputArray = input.split(',').map(Number)

  inputArray[1] = 12
  inputArray[2] = 2

  let i = 0
  while (true) {
    const operation = inputArray[i]

    if (operation === 99) {
      break
    }

    if (operation === 1) {
      inputArray[inputArray[i + 3]] = inputArray[inputArray[i + 1]] + inputArray[inputArray[i + 2]]
    }

    if (operation === 2) {
      inputArray[inputArray[i + 3]] = inputArray[inputArray[i + 1]] * inputArray[inputArray[i + 2]]
    }

    i += 4
  }

  return inputArray[0]
}

module.exports.expectedResult = 3058646
