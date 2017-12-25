const { path } = require('ramda')

module.exports.tests = [
  [`.#.#.#
...##.
#....#
..#...
#.#..#
####..`, 4]
]

const steps = 100
module.exports.solution = (rows) => {
  let grid = rows.split('\n')
    .map((row) => {
      return row.split('')
        .map(state => state === '#' ? 1 : 0)
    })

  const countOnAdjacent = (row, column) => {
    const adjacents = [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1],
    ]

    return adjacents
      .reduce((count, [x, y]) => {
        return count + (path([x, y], grid) || 0)
      }, 0)
  }

  const switchLight = (state, row, column) => {
    const onAdjacent = countOnAdjacent(row, column)
    if (state) {
      if (onAdjacent !== 2 && onAdjacent !== 3) {
        return 0
      }
    } else {
      if (onAdjacent === 3) {
        return 1
      }
    }
    return state
  }

  const iterate = (gridState) => {
    return gridState.map((row, rowNumber) => {
      return row.map((cell, columnNumber) => {
        return switchLight(cell, rowNumber, columnNumber)
      })
    })
  }

  for(let i = 0; i < steps; i += 1) {
    grid = iterate(grid.concat())
  }

  const countGrid = () => {
    let result = 0

    grid.forEach((row) => {
      row.forEach((cell) => {
        result += (cell || 0)
      })
    })

    return result
  }

  return countGrid()
}

module.exports.expectedResult = 821
