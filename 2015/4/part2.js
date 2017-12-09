const crypto = require('crypto')

module.exports.tests = []

const md5 = (string) => {
  return crypto.createHash('md5').update(string).digest("hex");
}

module.exports.solution = (input) => {
  let result = 0
  let generatedMd5 = ''

  while(!generatedMd5.match(/^000000/)) {
    result += 1
    generatedMd5 = md5(`${input}${result}`)
  }

  return result
}

module.exports.expectedResult = 9958218
