const express = require('express')
const app = express.Router()
const Post = require('../models/post')

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

module.exports = app
