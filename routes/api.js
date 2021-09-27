const express = require('express')
const app = express.Router()
const post_controller = require('../controllers/postController')

// Post routes
app.get('/posts', post_controller.get_posts)

app.get('/posts/:id', post_controller.get_single_post)

app.post('/posts', post_controller.create_post)

app.put('/posts/:id', post_controller.update_post)

app.delete('/posts/:id', post_controller.delete_post)

// Comment routes
app.post('/posts/:postid/comments')

app.get('/posts/:postid/comments')

app.get('/posts/:postid/comments/:commentid')

app.put('/posts/:postid/comments/:commentid')

app.delete('/posts/:postid/comments/:commentid')

// Author routes
app.post('/sign-up')

app.post('/login')

app.get('/logout')

module.exports = app
