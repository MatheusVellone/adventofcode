module.exports.tests = [
  ['[1,2,3]', 6],
  ['[1,{"c":"red","b":2},3]', 4],
  ['{"d":"red","e":[1,2,3,4],"f":5}', 0],
  ['[1,"red",5]', 6],
]

const normalizeToArray = (input) => {
  if (Array.isArray(input)) {
    return input
  }

  return Object.values(input)
}

const haveRed = (object) => {
  return !Array.isArray(object)
    && Object.values(object).some(value => value ==='red')
}

const getSum = (input) => {
  const array = normalizeToArray(input)

  return array.reduce((result, value) => {
    const typeofValue = typeof value
    let increment = 0

    if (typeofValue === 'object' && !haveRed(value)) {
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

  if (haveRed(input)) {
    return 0
  }

  return getSum(input)
}

module.exports.expectedResult = 65402
