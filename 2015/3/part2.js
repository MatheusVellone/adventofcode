module.exports.tests = [
  ['^v', 3],
  ['^>v<', 3],
  ['^v^v^v^v^v', 11],
]

module.exports.solution = (input) => {
  let result = 1
  const visited = {'0x0': true}
  let santasTurn = true
  let santaCurrentBlock = {x: 0, y: 0}
  let santasRobotCurrentBlock = {x: 0, y: 0}

  input.split('')
    .forEach((direction) => {
      switch (direction) {
        case '^':
          if (santasTurn) {
            santaCurrentBlock.y += 1
          } else {
            santasRobotCurrentBlock.y += 1
          }
          break
        case '<':
          if (santasTurn) {
            santaCurrentBlock.x -= 1
          } else {
            santasRobotCurrentBlock.x -= 1
          }
          break
        case '>':
          if (santasTurn) {
            santaCurrentBlock.x += 1
          } else {
            santasRobotCurrentBlock.x += 1
          }
          break
        case 'v':
          if (santasTurn) {
            santaCurrentBlock.y -= 1
          } else {
            santasRobotCurrentBlock.y -= 1
          }
          break
      }

      const santaVisitingBlock = `${santaCurrentBlock.x}x${santaCurrentBlock.y}`
      if (!visited[santaVisitingBlock]) {
        result += 1
        visited[santaVisitingBlock] = true
      }

      const santasRobotVisitingBlock = `${santasRobotCurrentBlock.x}x${santasRobotCurrentBlock.y}`
      if (!visited[santasRobotVisitingBlock]) {
        result += 1
        visited[santasRobotVisitingBlock] = true
      }

      santasTurn = !santasTurn
    })

  return result
}

module.exports.expectedResult = undefined
