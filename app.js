// Setting up Express
const express = require('express')
const app = express()
const morgan = require('morgan')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// API Route
const apiRoute = require('./routes/api')

app.use('/api', apiRoute)

app.listen(3000)
