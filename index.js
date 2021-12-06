process.env.UV_THREADPOOL_SIZE = 1 // This does not the restrict the total number of threads in our entier cluster, So every child in the cluster only has on thread avilable.
const cluster = require('cluster')
const express = require('express')
const app = express()
const crypto = require('crypto')

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode.
  cluster.fork()
} else {
  //   // I am a chile and I will act as a server and nothing else.
  //   function doWork(duration) {
  //     const start = Date.now()
  //     while (Date.now() - start < duration) {}
  //   }

  app.get('/', (req, res) => {
    res.send('Hi there :)')
    // doWork(5000)
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there :)')
    })
  })

  app.get('/fast', (req, res) => {
    res.send('This was fast!')
  })

  app.listen(3000, () => {
    console.log('Server is up on port 3000')
  })
}
