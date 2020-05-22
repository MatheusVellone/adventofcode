module.exports.tests = [
]

const run = (noun, verb, array) => {
  array[1] = noun
  array[2] = verb

  let i = 0
  while (true) {
    const operation = array[i]

    if (operation === 99) {
      break
    }

    if (operation === 1) {
      array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]]
    }

    if (operation === 2) {
      array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]]
    }

    i += 4
  }

  return array[0]
}

module.exports.solution = (input) => {
  const inputArray = input.split(',').map(Number)

  const expectedResult = 19690720

  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 100; j += 1) {
      const result = run(i, j, inputArray.slice(0))

      if (result === expectedResult) {
        return 100 * i + j
      }
    }
  }
}

module.exports.expectedResult = 8976
