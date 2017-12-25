module.exports.tests = [
  [`Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`, 330],
]

const regex = /(.*?) would (gain|lose) (\d+) .* (.*?)\./
module.exports.solution = (input) => {
  const relations = {}
  const namesIsSeated = {}

  input.split('\n')
    .forEach((expression) => {
      const [
        ,
        name1,
        signal,
        value,
        name2,
      ] = expression.match(regex)

      if (!relations[name1]) {
        relations[name1] = {}
      }
      if (!relations[name2]) {
        relations[name2] = {}
      }

      relations[name1][name2] = (relations[name1][name2] || 0)
        + (signal === 'lose' ? -1 : 1) * value
      relations[name2][name1] = (relations[name2][name1] || 0)
        + (signal === 'lose' ? -1 : 1) * value
    })

  const allNames = Object.keys(relations)
  const restart = () => {
    allNames.forEach(name => namesIsSeated[name] = false)
  }
  return allNames.reduce((bestResult, firstToSeat) => {
    restart()

    const findBestSeatOption = (name, firstToSeat) => {
      return Object.keys(relations[name])
          .reduce((best, relationWith) => {
            if ((!best || relations[name][relationWith] > best.happiness)
              && !namesIsSeated[relationWith]) {
              return {
                name: relationWith,
                happiness: relations[name][relationWith],
              }
            }
            return best
          }, false)
        || {
          name: firstToSeat,
          happiness: relations[name][firstToSeat]
        }
    }

    const remainingToSeat = () => {
      return allNames
        .filter(name => !namesIsSeated[name])
        .length
    }

    let totalHappiness = 0
    let currentName = firstToSeat
    let remainingSeats = remainingToSeat()

    while (remainingSeats > 0) {
      namesIsSeated[currentName] = true

      const { happiness, name } = findBestSeatOption(currentName, firstToSeat)
      currentName = name
      totalHappiness += happiness
      remainingSeats = remainingToSeat()
    }

    return totalHappiness > bestResult ? totalHappiness : bestResult
  }, 0)
}

module.exports.expectedResult = 709
