module.exports.tests = [
  ['ugknbfddgicrmopn', 1],
  ['aaa', 1],
  ['jchzalrnumimnmhp', 0],
  ['haegwjzuvuyypxyu', 0],
  ['dvszwmarrgswjxmb', 0],
]

const blacklist = ['ab', 'cd', 'pq', 'xy']
const sequentialCheckRegex = new RegExp(`(${blacklist.join('|')})`, 'g')

module.exports.solution = (inputs) => {
  let result = 0

  inputs.split('\n')
    .forEach((input) => {
      const hasThreeVowels = input.match(/.*[aeiou].*[aeiou].*[aeiou].*/g)
      const haveTwiceInARow = input.match(/(.)\1+/g)
      const haveSequentialString = input.match(sequentialCheckRegex)

      const valid = hasThreeVowels && haveTwiceInARow && !haveSequentialString

      if (valid) {
        result += 1
      }
    })

  return result
}

module.exports.expectedResult = 255
