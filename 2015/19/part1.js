module.exports.tests = [
  [`H => HO
H => OH
O => HH

HOH`, 4]
]

const regex = /(.*) => (.*)/
module.exports.solution = (input) => {
  const replaceMap = {}
  const molecules = {}

  const initialMolecule = input.split('\n')
    .reduce((prev, line) => {
      const match = line.match(regex)
      if (match) {
        const [, from, to] = match
        if (!replaceMap[from]) {
          replaceMap[from] = []
        }
        replaceMap[from].push(to)
        return
      }

      if (line.length) {
        return line
      }
    }, null)

    const initialMoleculeSplit = initialMolecule.match(/([A-Z][a-z]*)/g)

    return initialMoleculeSplit
      .filter((char, index, self) => {
        return self.indexOf(char) === index
      })
      .reduce((differentMolecules, char) => {
        const charIndexes = initialMoleculeSplit
          .map((letter, index) => letter === char ? index : false)
          .filter(x => x !== false)

        charIndexes.forEach((charIndex) => {
          if (!replaceMap[char]) {
            return
          }

          replaceMap[char].forEach((replaceMolecule) => {
            const moleculeSplit = initialMoleculeSplit.concat()
            moleculeSplit[charIndex] = replaceMolecule

            const newMolecule = moleculeSplit.join('')
            if (!molecules[newMolecule]) {
              differentMolecules += 1
              molecules[newMolecule] = true
            }
          })
        })

        return differentMolecules
      }, 0)
}

module.exports.expectedResult = 518
