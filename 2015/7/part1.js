module.exports.tests = [
  [`123 -> x
456 -> y
x AND y -> d
x OR y -> a
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`, 507],
]

const LSHIFT = {
  regex: /(.*) LSHIFT (.*)/,
  action: (n1, n2, s) => {
    const a = isNaN(n1) ? s[n1] : n1
    const b = isNaN(n2) ? s[n2] : n2

    if (typeof a === 'undefined' || typeof b === 'undefined') {
      return false
    }

    return a << b
  },
}
const RSHIFT = {
  regex: /(.*) RSHIFT (.*)/,
  action: (n1, n2, s) => {
    const a = isNaN(n1) ? s[n1] : parseInt(n1, 10)
    const b = isNaN(n2) ? s[n2] : parseInt(n2, 10)

    if (typeof a === 'undefined' || typeof b === 'undefined') {
      return false
    }

    return a >> b
  },
}
const NOT = {
  regex: /NOT (.*)/,
  action: (n1, s) => {
    const a = isNaN(n1) ? s[n1] : parseInt(n1, 10)

    if (typeof a === 'undefined') {
      return false
    }

    return ~a
  },
}
const AND = {
  regex: /(.*) AND (.*)/,
  action: (n1, n2, s) => {
    const a = isNaN(n1) ? s[n1] : parseInt(n1, 10)
    const b = isNaN(n2) ? s[n2] : parseInt(n2, 10)

    if (typeof a === 'undefined' || typeof b === 'undefined') {
      return false
    }

    return a & b
  },
}
const OR = {
  regex: /(.*) OR (.*)/,
  action: (n1, n2, s) => {
    const a = isNaN(n1) ? s[n1] : parseInt(n1, 10)
    const b = isNaN(n2) ? s[n2] : parseInt(n2, 10)

    if (typeof a === 'undefined' || typeof b === 'undefined') {
      return false
    }

    return a | b
  },
}
const ASSIGN = {
  regex: /^([a-zA-Z0-9]+)$/,
  action: (value, state) => {
    if (isNaN(value)) {
      if (typeof state[value] === 'undefined') {
        return false
      }
      return state[value]
    }
    return parseInt(value, 10)
  },
}

const checkCommand = (command, state, commandToTest) => {
  const match = command.match(commandToTest.regex)

  if (match) {
    const [, ...matches] = match
    return commandToTest.action(...matches, state)
  }
  return false
}

const processCommand = (state, command) => {
  const and = checkCommand(command, state, AND)
  if (and !== false) return and

  const or = checkCommand(command, state, OR)
  if (or !== false) return or

  const not = checkCommand(command, state, NOT)
  if (not !== false) return not

  const lShift = checkCommand(command, state, LSHIFT)
  if (lShift !== false) return lShift

  const rShift = checkCommand(command, state, RSHIFT)
  if (rShift !== false) return rShift

  return checkCommand(command, state, ASSIGN)
}

module.exports.solution = (inputs) => {
  const result = {}
  const linesNotReady = []

  const processLine = (line) => {
    const [, command, wire] = line.match(/(.*) -> (.*)/)

    const commandResult  = processCommand(result, command.toString())

    if (commandResult === false) {
      linesNotReady.push(line)
    } else {
      result[wire] = commandResult
    }
  }

  inputs.split('\n')
    .forEach((line) => {
      processLine(line)
    })

  while (linesNotReady.length) {
    processLine(linesNotReady.shift())
  }

  return result.a
}

module.exports.expectedResult = 16076
