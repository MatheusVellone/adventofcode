module.exports.tests = [
  // [`20
  // 15
  // 10
  // 5
  // 5`, 4]
]

// https://gist.github.com/axelpale/3118596
const k_combinations = (set, k) => {
  let i, j, combs, head, tailcombs

  if (k > set.length || k <= 0) {
    return []
  }

  if (k === set.length) {
    return [set]
  }

  if (k === 1) {
    combs = []
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }

  combs = []
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1)
    tailcombs = k_combinations(set.slice(i + 1), k - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}

const combinations = (set) => {
  let k, i, combs, k_combs
  combs = []

  for (k = 1; k <= set.length; k++) {
    k_combs = k_combinations(set, k)
    for (i = 0; i < k_combs.length; i++) {
      combs.push(k_combs[i])
    }
  }
  return combs
}

const liters = 150
module.exports.solution = (input) => {
  const containersVolumes = input.split('\n')
    .map(x => parseInt(x, 10))

  return combinations(containersVolumes)
    .filter((combination) => {
      return combination.reduce((a, b) => a + b) === liters
    })
    .length
}

module.exports.expectedResult = 4372
