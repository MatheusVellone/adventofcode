module.exports.tests = [
  ['R2, L3', 5],
  ['R2, R2, R2', 2],
  ['R5, L5, R5, R3', 12],
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

  input
    .split(', ')
    .forEach((instruction) => {
      const [direction, ...steps] = instruction.split('')

      facing = turn(facing, direction)

      if (facing === 0) {
        position.x += Number(steps.join(''))
      } else if (facing === 2) {
        position.x -= Number(steps.join(''))
      } if (facing === 1) {
        position.y += Number(steps.join(''))
      } else if (facing === 3) {
        position.y -= Number(steps.join(''))
      }
    })

  return Math.abs(position.x) + Math.abs(position.y)
}

module.exports.expectedResult = undefined
