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
]

exports.login = async (req, res, next) => {}

exports.logout = (req, res, next) => {}
