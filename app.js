// Setting up Express
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

// API Route
const apiRoute = require('./routes/api')

// Setup mongoose connection
const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://devc7854:kakashi7854@cluster0.gt4nz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Middlewares
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.redirect('/api')
})

app.use('/api', apiRoute)

app.listen(process.env.PORT || 3000)
