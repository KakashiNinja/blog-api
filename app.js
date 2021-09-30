// Setting up Express
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const Author = require('./models/author')
require('dotenv').config()

// Passport auth
passport.use(
  'login',
  new localStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await Author.findOne({ username })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'wrong password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'myblog',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await Author.create({ username, password })
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

// API Route
const apiRoute = require('./routes/api')

// Setup mongoose connection
const mongoose = require('mongoose')
const dev_db_url =
  'mongodb+srv://devc7854:devc7854@cluster0.gt4nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Middlewares
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.redirect('/api')
})

app.use('/api', apiRoute)

app.listen(3000)
