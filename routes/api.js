const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  res.send('I am API and working fine')
})

module.exports = app
