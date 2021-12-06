const fs = require('fs')
const nums = fs.readFileSync('day5IntermediateOutput.txt').toString().split('\n')

const seen = new Set()
const processed = new Set()
let intersections = 0
for (const num of nums) {
  if (!seen.has(num)) {
    seen.add(num)
  } else if (!processed.has(num)) {
    intersections++
    processed.add(num)
  }

}
console.log(intersections)

