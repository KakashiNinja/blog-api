const express = require('express')
const app = express.Router()
const post_controller = require('../controllers/postController')

// get all posts
app.get('/posts', post_controller.get_posts)

// get single post
app.get('/posts/:id', post_controller.get_single_post)

// create post
app.post('/posts', post_controller.create_post)

// update post
app.put('/posts/:id', post_controller.update_post)

// delete post
app.delete('/posts/:id', post_controller.delete_post)

module.exports = app
