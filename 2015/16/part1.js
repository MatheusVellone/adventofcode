module.exports.tests = []

const auntProperties = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}
const regex = /Sue \d+: (.*?): (\d+), (.*?): (\d+), (.*?): (\d+)/

const match = (property, value) =>
  auntProperties[property] === parseInt(value, 10)

module.exports.solution = (auntsInput) => {
  let maxScore = 0
  let maxScoreIndex

  auntsInput
    .split('\n')
    .forEach((aunt, index) => {
      const [, p1, n1, p2, n2, p3, n3] = aunt.match(regex)

      let score = 0

      if (match(p1, n1)) {
        score += 1
      }
      if (match(p2, n2)) {
        score += 1
      }
      if (match(p3, n3)) {
        score += 1
      }

      if (score > maxScore) {
        maxScore = score
        maxScoreIndex = index + 1
      }
    })

  return maxScoreIndex
}

module.exports.expectedResult = 40
