const express = require('express')
const app = express.Router()
const post_controller = require('../controllers/postController')
const comment_controller = require('../controllers/commentController')
const author_controller = require('../controllers/authorController')

// Post routes
app.get('/', (req, res) => {
  res.redirect('/posts')
})

app.get('/posts', post_controller.get_posts)

app.get('/posts/:id', post_controller.get_single_post)

app.post('/posts', post_controller.create_post)

app.put('/posts/:id', post_controller.update_post)

app.delete('/posts/:id', post_controller.delete_post)

// Comment routes
app.post('/posts/:postid/comments', comment_controller.create_comment)

app.get('/posts/:postid/comments', comment_controller.get_comments)

app.get(
  '/posts/:postid/comments/:commentid',
  comment_controller.get_single_comment
)

app.put('/posts/:postid/comments/:commentid', comment_controller.update_comment)

app.delete(
  '/posts/:postid/comments/:commentid',
  comment_controller.delete_comment
)

// Author routes
app.post('/sign-up', author_controller.signup)

app.post('/login', author_controller.login)

app.get('/logout', author_controller.logout)

module.exports = app
