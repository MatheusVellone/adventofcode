module.exports.tests = [
  [`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`, 1564]
]

const timeStop = 2503
const regex = /.* fly (\d+?) .* for (\d+?) .* (\d+?) seconds/
module.exports.solution = (reindeersData) => {
  let current = 0

  const iterateReindeers = (reindeers) => {
    // console.log(reindeers)
    let maxDistance = 0

    return reindeers.map(({
      speed,
      flyTime,
      restTime,
      points,
      distance,
      resting,
      timeResting,
      timeFlying,
    }) => {
      if (resting) {
        timeResting += 1
        if (timeResting === restTime) {
          resting = false
          timeResting = 0
        }
      } else {
        timeFlying += 1
        distance += speed
        if (timeFlying === flyTime) {
          resting = true
          timeFlying = 0
        }
      }

      if (distance > maxDistance) {
        maxDistance = distance
      }

      return {
        speed,
        flyTime,
        restTime,
        points,
        distance,
        resting,
        timeResting,
        timeFlying,
      }
    })
      .map((reindeer) => {
        if (reindeer.distance === maxDistance) {
          reindeer.points += 1
        }
        return reindeer
      })
  }

  let reindeers = reindeersData.split('\n')
    .map((reindeer) => {
      const [
        ,
        speedString,
        flyTimeString,
        restTimeString,
      ] = reindeer.match(regex)

      return {
        speed: parseInt(speedString, 10),
        flyTime: parseInt(flyTimeString, 10),
        restTime: parseInt(restTimeString, 10),
        points: 0,
        distance: 0,
        resting: false,
        timeResting: 0,
        timeFlying: 0,
      }
    })

  while (current < timeStop) {
    reindeers = iterateReindeers(reindeers)
    current += 1
  }

  return Math.max(...reindeers.map(r => r.points))
}

module.exports.expectedResult = 1084
