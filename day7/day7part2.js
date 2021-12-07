const positions = require('fs').readFileSync('day7.txt')
  .toString()
  .split(',')
  .map(e => +e)

const maxPos = Math.max(...positions)
const minPos = Math.min(...positions)


// f(1) = 1
// f(2) = 2
// f(3) = 3
function costToMove(pos) {
  let result = 0
  for (const x of positions) {
    const n = Math.abs(x - pos)
    result += (n + 1) * n / 2
  }
  return result
}

let result = 1000000000000000000
for (let i = minPos; i < maxPos + 1; i++) {
  const currentCost = costToMove(i)
  if (currentCost < result) { result = currentCost }
}

console.log(result)
