module.exports.tests = []

const commands = {
  'turn on': current => current + 1,
  'turn off': current => current && current - 1,
  'toggle': current => current + 2,
}

module.exports.solution = (inputs) => {
  const grid = Array(...Array(1000)).map(() => Array(...Array(1000)).map(() => 0))

  const countGrid = () => {
    let result = 0

    grid.forEach((row) => {
      row.forEach((cell) => {
        result += (cell || 0)
      })
    })

    return result
  }

  inputs.split('\n')
    .forEach((input) => {
      const [,
        command,
        fromX,
        fromY,
        toX,
        toY
      ] = input.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/)

      const initialX = Math.min(fromX, toX)
      const finalX = Math.max(fromX, toX)
      const initialY = Math.min(fromY, toY)
      const finalY = Math.max(fromY, toY)
      for (let row = initialY; row <= finalY; row++) {
        for (let column = initialX; column <= finalX; column++) {
          grid[row][column] = commands[command](grid[row][column])
        }
      }
    })

  return countGrid()
}

module.exports.expectedResult = 17836115
