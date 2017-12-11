module.exports.tests = [
  [`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`, 982]
]

module.exports.solution = (inputs) => {
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

  const longestDistanceFrom = (startingCity) => {
    let totalDistance = 0

    const toVisit = Object.keys(graph)
    toVisit.splice(toVisit.indexOf(startingCity), 1)

    const visitFarthestNonVisitedCity = (currentCity) => {
      const connections = Object.keys(graph[currentCity])
      const farthestCity = connections
        .reduce((farthest, connection) => {
          const needToVisit = toVisit.includes(connection)

          if (!farthest && needToVisit) {
            return connection
          }

          if (graph[currentCity][connection] > graph[currentCity][farthest] && needToVisit) {
            return connection
          }

          return toVisit.includes(farthest) && farthest
        }, false)

      totalDistance += graph[currentCity][farthestCity]
      toVisit.splice(toVisit.indexOf(farthestCity), 1)

      return farthestCity
    }

    let currentCity = startingCity
    while (toVisit.length) {
      currentCity = visitFarthestNonVisitedCity(currentCity)
    }

    return totalDistance
  }

  return Object.keys(graph)
    .reduce((longestDistance, startingCity) => {
      const thisCityDistance = longestDistanceFrom(startingCity)

      if (longestDistance < thisCityDistance) {
        return thisCityDistance
      }

      return longestDistance
    }, 0)
}

module.exports.expectedResult = 909
