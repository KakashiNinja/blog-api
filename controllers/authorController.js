const Author = require('../models/author')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

exports.signup = [
  body('username', 'Empty name')
    .trim()
    .escape()
    .custom(async (username) => {
      try {
        const existingUsername = await Author.findOne({ username: username })
        if (existingUsername) {
          throw new Error('username already in use')
        }
      } catch (err) {
        return next(err)
      }
    }),
  body('password', 'Empty password')
    .trim()
    .isLength(6)
    .withMessage('Minimum lenght 6 characters'),

  body('confirm-password').custom((value, { req }) => {
    if (value !== req.body.password) {
      return next('Password confirmation does not match')
    }
    // Indicated the success of this synchronous custom validator
    return true
  }),

  async (req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.json({
          username: req.body.username,
          errors: errors.array(),
        })
      }

      if (err) {
        return next(err)
      }

      res.json({
        message: 'Signed-up successfully',
        user: req.user,
      })
    })(req, res, next)
  },
]

exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('And error occured')
        return next(error)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, username: user.username }
        const token = jwt.sign({ user: body }, process.env.SECRET, {
          expiresIn: '1d',
        })
        return res.json({ token })
      })
    } catch (err) {
      return next(err)
    }
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  req.logout()
  res.redirect('/')
}
