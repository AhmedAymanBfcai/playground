const express = require('express')
const app = express()
const crypto = require('crypto')

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
