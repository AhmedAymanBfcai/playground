const express = require('express')
const app = express()
const crypto = require('crypto')
const Worker = require('webworker-threads').Worker

app.get('/', (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      // This will be invoked will our application calls post message.
      let counter = 0
      while (counter < 1e9) {
        counter++
      }
      postMessage(counter)
    }
  })

  // Whenever our worker sends a message back to our application the function will be called
  worker.onmessage = function (message) {
    console.log(message)
    res.send('' + message.data)
  }

  worker.postMessage()
})

app.get('/fast', (req, res) => {
  res.send('This was fast!')
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
