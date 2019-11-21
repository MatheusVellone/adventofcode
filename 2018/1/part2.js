module.exports.tests = [
  ['+1\n+1\n-1', 1],
]

const processList = (input, found, current) => {
  let foundNumber = false

  input.some((number) => {
    current += number

    if (found[current]) {
      foundNumber = current
      return true
    }

    found[current] = true
    return false
  })

  if (foundNumber) {
    return { foundAnything: foundNumber }
  }

  return {
    foundAnything: false,
    newCurrent: current,
  }
}

module.exports.solution = (input) => {
  input = input.split('\n').map(Number)

  const found = {}
  let result = 0
  let current = 0

  while (result === 0) {
    const { newCurrent, foundAnything } = processList(input, found, current)
    if (foundAnything) {
      result = foundAnything
    }
    current = newCurrent
  }

  return result
}

module.exports.expectedResult = 69074
