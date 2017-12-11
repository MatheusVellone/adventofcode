module.exports.tests = [
  [`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`, 605]
]

module.exports.solution = (inputs) => {
  let result = 0
  const graph = {}

  const addRoute = (from, to, distance) => {
    if (!graph[from]) {
      graph[from] = {}
    }

    graph[from][to] = parseInt(distance, 10)
  }

  inputs.split('\n')
    .map((input) => {
      const [, source, destination, distance] = input.match(/(.*) to (.*) = (\d+)/)

      addRoute(source, destination, distance)
      addRoute(destination, source, distance)
    })

  const toVisit = Object.keys(graph)
  const visitNearestNonVisitedCity = (currentCity) => {
    const connections = Object.keys(graph[currentCity])
    const nearestCity = connections
      .reduce((nearest, connection) => {
        const needToVisit = toVisit.includes(connection)

        if (!nearest && needToVisit) {
          return connection
        }

        if (graph[currentCity][connection] < graph[currentCity][nearest] && needToVisit) {
          return connection
        }

        return toVisit.includes(nearest) && nearest
      }, false)

    result += graph[currentCity][nearestCity]

    toVisit.splice(toVisit.indexOf(nearestCity), 1)
    return nearestCity
  }

  let currentCity = toVisit.shift()
  while (toVisit.length) {
    currentCity = visitNearestNonVisitedCity(currentCity)
  }

  return result
}

module.exports.expectedResult = 117
