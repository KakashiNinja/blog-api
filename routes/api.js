const express = require('express')
const app = express.Router()
const Post = require('../models/post')
const { body, validationResult } = require('express-validator')

// get all posts
app.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.find({})
    if (!posts) {
      return res.status(404).json({ err: 'posts not found' })
    }
    res.status(200).json({ posts })
  } catch (err) {
    next(err)
  }
})

// get single post
app.get('/posts/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ err: 'post by this id not found' })
    }
    res.status(200).json({ post })
  } catch (err) {
    next(err)
  }
})

// create post
app.post('/posts', [
  body('author_name', 'Should not be empty').trim().escape(),
  body('title', 'Should not be empty').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    // If errors throw error with msg and data
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      })
    }
    // successful and continue
    const { author_name, title, text } = req.body
    // Date by default current date, published by default false
    const post = new Post({
      author_name,
      title,
      text,
    })

    post.save(function (err) {
      if (err) {
        return next(err)
      }
      res.status(200).json({ msg: 'post created' })
    })
  },
])

// update post
app.put('/posts/:id', (req, res, next) => {})

// delete post
app.delete('/posts/:id', (req, res, next) => {})

module.exports = app
