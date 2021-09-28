const express = require('express')
const app = express.Router()
const post_controller = require('../controllers/postController')
const { body, validationResult } = require('express-validator')
const Comment = require('../models/comment')

// Post routes
app.get('/posts', post_controller.get_posts)

app.get('/posts/:id', post_controller.get_single_post)

app.post('/posts', post_controller.create_post)

app.put('/posts/:id', post_controller.update_post)

app.delete('/posts/:id', post_controller.delete_post)

// Comment routes
app.post('/posts/:postid/comments', [
  body('text', 'Empty text').trim().escape(),
  body('user', 'Empty user').trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      })
    }

    const { user, text } = req.body
    const postId = req.params.postid

    const comment = new Comment({
      user,
      text,
      postId,
    })

    comment.save((err) => {
      if (err) {
        return next(err)
      }
      res.status(200).json({
        msg: 'comment sent',
      })
    })
  },
])

app.get('/posts/:postid/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({})

    if (!comments) {
      res.status(404).json({ err: 'comment not found' })
    }
    res.status(200).json({ comments })
  } catch (err) {
    return next(err)
  }
})

app.get('/posts/:postid/comments/:commentid')

app.put('/posts/:postid/comments/:commentid')

app.delete('/posts/:postid/comments/:commentid')

// Author routes
app.post('/sign-up')

app.post('/login')

app.get('/logout')

module.exports = app
