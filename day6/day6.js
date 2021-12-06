let fishTimers = require('fs').readFileSync('day6.txt').toString().split(',').map(e => +e)
const numReadyToSpawn = fishAges => fishAges.reduce((a, e) => e == 0 ? a + 1 : a, 0)
const updateFishTimer = t => t === 0 ? 6 : t - 1
const updateTimers = fishAges => 
  fishAges.map(updateFishTimer)
  .concat(Array(numReadyToSpawn(fishAges)).fill(8))

for (let i = 0; i < 80; i++) {
  fishTimers = updateTimers(fishTimers)
}
console.log(fishTimers.length)
