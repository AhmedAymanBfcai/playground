const cluster = require('cluster')
const express = require('express')
const app = express()

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode.
  cluster.fork()
} else {
  // I am a chile and I will act as a server and nothing else.
  function doWork(duration) {
    const start = Date.now()
    while (Date.now() - start < duration) {}
  }

  app.get('/', (req, res) => {
    res.send('Hi there :)')
    doWork(5000)
  })

  app.listen(3000, () => {
    console.log('Server is up on port 3000')
  })
}
