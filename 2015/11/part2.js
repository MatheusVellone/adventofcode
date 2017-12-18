module.exports.tests = []

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const threeFirst = /.{3}/
const getCombinations = (chars = alphabet, combinations = []) => {
  const [ combination ] = chars.match(threeFirst)
  combinations.push(combination)

  if (chars.length > 3) {
    return getCombinations(chars.slice(1), combinations)
  }

  return combinations
}

const replace = (string, index, replacement) => {
  return string.substr(0, index)
    + replacement
    + string.substr(index + replacement.length)
}

const increment = (current, charToIncrement = current.length - 1) => {
  const char = current.charCodeAt(charToIncrement)

  let nextChar = char + 1

  if (char === 122) {
    nextChar = 97
    current = increment(current, charToIncrement - 1)
  }

  return replace(
    current,
    charToIncrement,
    String.fromCharCode(nextChar)
  )
}

const notAllowed = /[iol]/
const repeatedRegex = /(.)\1/g
const combinations = getCombinations()

const isValid = (input) => {
  const repeated = input.match(repeatedRegex) || []
  return repeated.length >= 2
    && repeated.filter((x, i) => repeated.indexOf(x) === i).length >= 2
    && !input.match(notAllowed)
    && combinations.some(combination => input.match(new RegExp(combination)))
}

module.exports.solution = (input) => {
  while (!isValid(input)) {
    input = increment(input)
  }

  input = increment(input)

  while (!isValid(input)) {
    input = increment(input)
  }

  return input
}

module.exports.expectedResult = 'vzcaabcc'
