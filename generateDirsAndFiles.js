const { existsSync, mkdirSync, writeFileSync } = require('fs')
const { join } = require('path')

const years = ['2015', '2016', '2017']
const days = []
for (let i = 1; i <= 25; i++) {
  days.push(i.toString())
}
const parts = ['1', '2']
const partFilename = part => `part${part}.js`
const readmeFilename = 'README.md'
const inputFilename = 'input.txt'
const githubBase = 'https://github.com/MatheusVellone/adventofcode/tree/master'

const yearReadmeTemplate = (year) => {
  let template = []

  template.push(`[Advent of Code - ${year}](http://adventofcode.com/${year})`)
  template.push('---------------------------')

  template.push('| Day           | Part 1 | Part 2 |')
  template.push('|---------------|--------------------|--------------------|')

  days.forEach((day) => {
    template.push(`| [${day}][${year}_${day}]   | | |`)
  })

  template.push('')

  days.forEach((day) => {
    template.push(`[${year}_${day}]: ${githubBase}/${year}/${day}`)
  })

  return template.join('\n')
}

const dayReadmeTemplate = (year, day) => {
  let template = []

  template.push(`[Advent of Code - ${year}/${day}](http://adventofcode.com/${year}/day/${day})`)
  template.push('---------------------------')
  template.push('')

  return template.join('\n')
}

const solutionFileTemplate = () => {
  let template = []

  template.push('module.exports.tests = []')
  template.push('')
  template.push('module.exports.solution = () => {')
  template.push('')
  template.push('}')
  template.push('')
  template.push('module.exports.expectedResult = undefined')
  template.push('')

  return template.join('\n')
}

years.forEach((year) => {
  const yearPath = join(__dirname, year)
  if (!existsSync(yearPath)) {
    mkdirSync(yearPath)
  }

  const yearReadme = join(yearPath, readmeFilename)
  if (!existsSync(yearReadme)) {
    writeFileSync(yearReadme, yearReadmeTemplate(year))
  }

  days.forEach((day) => {
    const dayPath = join(yearPath, day)
    if (!existsSync(dayPath)) {
      mkdirSync(dayPath)
    }

    const dayReadme = join(dayPath, readmeFilename)
    if (!existsSync(dayReadme)) {
      writeFileSync(dayReadme, dayReadmeTemplate(year, day))
    }

    const inputPath = join(dayPath, inputFilename)
    if (!existsSync(inputPath)) {
      writeFileSync(inputPath, '')
    }

    parts.forEach((part) => {
      const partPath = join(dayPath, partFilename(part))
      if (!existsSync(partPath)) {
        writeFileSync(partPath, solutionFileTemplate())
      }
    })
  })
})
