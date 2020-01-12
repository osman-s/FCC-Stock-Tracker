'use strict'
const v8 = require('v8')

const totalHeapsize = v8.getHeapStatistics().total_available_size
let totalHeapsizeInGB = (totalHeapsize / 1024 /1024 / 1024).toFixed(2)


console.log(`Total heap size (bytes) ${totalHeapsize}, (GB ~${totalHeapsizeInGB})`)

// node --max-old-space-size=8192 server.js