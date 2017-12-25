module.exports.tests = [
  ['turn on 0,0 through 999,999', 1000000],
  ['toggle 0,0 through 999,0', 1000],
  ['turn off 499,499 through 500,500', 0],
]

const commands = {
  'turn on': () => 1,
  'turn off': () => 0,
  'toggle': current => 1- current,
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

module.exports.expectedResult = 569999
