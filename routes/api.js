const express = require('express')
const app = express.Router()
const Post = require('../models/post')

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
app.post('/posts', (req, res, next) => {})

// update post
app.put('/posts/:id', (req, res, next) => {})

// delete post
app.delete('/posts/:id', (req, res, next) => {})

module.exports = app
