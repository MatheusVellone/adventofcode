module.exports.tests = [
  ['R8, R4, R4, R8', 4],
]

const turn = (current, turnDirection) => {
  let newDirection = current

  if (turnDirection === 'R') {
    newDirection += 1
  } else {
    newDirection -= 1
  }

  if (newDirection === 4) {
    newDirection = 0
  }

  if (newDirection === -1) {
    newDirection = 3
  }

  return newDirection
}

module.exports.solution = (input) => {
  let facing = 0
  const position = {
    x: 0,
    y: 0,
  }
  const visited = {}

  const moveByOne = (dx, dy, negative) => {
    const coord = dx !== 0 ? 'x' : 'y'

    for (let i = 0; i < Math.abs(dx + dy); i += 1) {
      if (firstVisitedDistance) {
        return
      }

      position[coord] += 1 * negative

      const key = position.x + '/' + position.y
      if (visited[key]) {
        firstVisitedDistance = Math.abs(position.x) + Math.abs(position.y)
      }

      visited[key] = true
    }
  }

  let firstVisitedDistance = false

  input
    .split(', ')
    .forEach((instruction) => {
      if (firstVisitedDistance !== false) {
        return
      }
      const [direction, ...steps] = instruction.split('')

      facing = turn(facing, direction)

      if (facing === 0) {
        moveByOne(Number(steps.join('')), 0, 1)
      } else if (facing === 2) {
        moveByOne(Number(steps.join('')), 0, -1)
      } if (facing === 1) {
        moveByOne(0, Number(steps.join('')), 1)
      } else if (facing === 3) {
        moveByOne(0, Number(steps.join('')), -1)
      }
    })

  return firstVisitedDistance
}

module.exports.expectedResult = undefined
