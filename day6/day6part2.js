let fishTimers = require('fs').readFileSync('day6.txt').toString().split(',').map(e => +e)                      
.reduce((a, e) => ({ ...a, ...(a[e] ? ({ [e]: a[e] + 1 }) : ({ [e]: 1 }))} ), {})                               
                                                                                                                
const updateTimers = fishAges => {                                                                              
  const result = {}                                                                                             
  if (Object.keys(fishAges).includes('1')) { result['0'] = fishAges['1'] }                                      
  if (Object.keys(fishAges).includes('2')) { result['1'] = fishAges['2'] }                                      
  if (Object.keys(fishAges).includes('3')) { result['2'] = fishAges['3'] }                                      
  if (Object.keys(fishAges).includes('4')) { result['3'] = fishAges['4'] }                                      
  if (Object.keys(fishAges).includes('5')) { result['4'] = fishAges['5'] }                                      
  if (Object.keys(fishAges).includes('6')) { result['5'] = fishAges['6'] }                                      
  if (Object.keys(fishAges).includes('7')) { result['6'] = fishAges['7'] }                                      
  if (Object.keys(fishAges).includes('8')) { result['7'] = fishAges['8'] }                                      
                                                                                                                
  if (Object.keys(fishAges).includes('0')) {                                                                    
    result['8'] = fishAges['0']                                                                                 
    if (result['6']) {                                                                                          
      result['6'] += fishAges['0']                                                                              
    } else {                                                                                                    
      result['6'] = fishAges['0']                                                                               
    }                                                                                                           
                                                                                                                
  }                                                                                                             
  return result                                                                                                 
                                                                                                                
}                                                                                                               
                                                                                                                
for (let i = 0; i < 256; i++) {                                                                                 
  fishTimers = updateTimers(fishTimers)                                                                         
}                                                                                                               
                                                                                                                
console.log(Object.values(fishTimers).reduce((a, e) => a + e, 0))
