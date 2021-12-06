const rows = data = require('fs').readFileSync('day3.txt').toString().split('\n')

const mostCommonBit = (colIdx, rows) => {
  let zeroCount = 0
  let oneCount = 0
  for (let row of rows) {
    if (row[colIdx] == "1") {
      oneCount += 1
    }
    if (row[colIdx] == "0") {
      zeroCount += 1
    }
  }
  if (zeroCount > oneCount) {
    return "0"
  }
  return "1"
}

const gammaRate = (() => {
  let s = ""
  for (let i = 0; i < rows[0].length; i++) {
    s += mostCommonBit(i, rows)
  }
  return s
})()

const epsilonRate = (() => {
  let s = ""
  for (let i = 0; i < rows[0].length; i++) {
    s += (mostCommonBit(i, rows) == "1" ? "0" : "1")
  }
  return s
})()

const toDecimal = binString => {
  let result = 0
  for (let i = binString.length - 1; i >= 0; i--) {
    console.log(binString.slice(i - 1, i))
    result += Math.pow(2, (binString.length - 1 - i)) * (binString.slice(i - 1, i) === "1" ? 1 : 0)
  }
  return result
}

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))
