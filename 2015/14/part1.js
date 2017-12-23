module.exports.tests = [
  [`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`, 2660]
]

const timeStop = 2503
const regex = /.* fly (\d+?) .* for (\d+?) .* (\d+?) seconds/
module.exports.solution = (reindeers) => {
  return Math.max(...reindeers.split('\n')
    .map((reindeer) => {
      const [
        ,
        speedString,
        flyTimeString,
        restTimeString,
      ] = reindeer.match(regex)

      const speed = parseInt(speedString, 10)
      const flyTime = parseInt(flyTimeString, 10)
      const restTime = parseInt(restTimeString, 10)

      let current = 0
      let distance = 0
      let resting = false

      while(current < timeStop) {
        if (resting) {
          current += restTime
          resting = false
        } else {
          resting = true
          if (current + flyTime > timeStop) {
            distance += speed * (timeStop - current)
            current = timeStop
          } else {
            current += flyTime
            distance += speed * flyTime
          }
        }
      }

      return distance
    }))
}

module.exports.expectedResult = 2696
