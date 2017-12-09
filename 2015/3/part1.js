module.exports.tests = [
  ['>', 2],
  ['^>v<', 4],
  ['^v^v^v^v^v', 2],
]

module.exports.solution = (input) => {
  let result = 1
  const visited = {'0x0': true}
  let currentBlock = {x: 0, y: 0}

  input.split('')
    .forEach((direction) => {
      switch (direction) {
        case '^':
          currentBlock.y += 1
          break
        case '<':
          currentBlock.x -= 1
          break
        case '>':
          currentBlock.x += 1
          break
        case 'v':
          currentBlock.y -= 1
          break
      }

      const visitingBlock = `${currentBlock.x}x${currentBlock.y}`
      if (!visited[visitingBlock]) {
        result += 1
        visited[visitingBlock] = true
      }
    })

  return result
}

module.exports.expectedResult = 2081
