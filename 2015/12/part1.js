module.exports.tests = [
  ['[1,2,3]', 6],
  ['{"a":2,"b":4}', 6],
  ['[[[3]]]', 3],
  ['{"a":{"b":4},"c":-1}', 3],
  ['[-1,{"a":1}]', 0],
  ['{"a":[-1,1]}', 0],
  ['[]', 0],
  ['{}', 0],
]

const normalizeToArray = (input) => {
  if (Array.isArray(input)) {
    return input
  }

  return Object.values(input)
}

const getSum = (input) => {
  const array = normalizeToArray(input)

  return array.reduce((result, value) => {
    const typeofValue = typeof value
    let increment = 0

    if (typeofValue === 'object') {
      increment = getSum(value)
    }

    if (typeofValue === 'number') {
      increment = value
    }

    return result + increment
  }, 0)
}

module.exports.solution = (inputString) => {
  const input = JSON.parse(inputString)

  return getSum(input)
}

module.exports.expectedResult = 111754
