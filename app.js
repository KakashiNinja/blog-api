// Setting up Express
const express = require('express')
const app = express()
const morgan = require('morgan')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Setup mongoose connection
const mongoose = require('mongoose')
const mongoDB =
  'mongodb+srv://devc7854:devc7854@cluster0.gt4nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// API Route
const apiRoute = require('./routes/api')

app.get('/', (req, res) => {
  res.redirect('/api')
})

app.use('/api', apiRoute)

app.listen(3000)
