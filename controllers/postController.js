const Post = require('../models/post')
const { body, validationResult } = require('express-validator')

exports.get_posts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
    if (!posts) {
      return res.status(404).json({ err: 'posts not found' })
    }
    res.status(200).json({ posts })
  } catch (err) {
    next(err)
  }
}

exports.get_single_post = async (req, res, next) => {
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
}

exports.create_post = [
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
]

exports.update_post = async (req, res, next) => {
  try {
    const { author_name, title, text } = req.body
    const post = await Post.findByIdAndUpdate(req.params.id, {
      author_name,
      title,
      text,
    })
    if (!post) {
      return res.status(404).json({ msg: 'updated successfully' })
    }
    return res.status(200).json({ msg: 'updated successfully' })
  } catch (err) {
    next(err)
  }
}

exports.delete_post = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res
        .status(404)
        .json({ err: `post with id: ${req.params.id} not found!` })
    }
    res
      .status(200)
      .json({ msg: `post with id: ${req.params.id} successfully deleted` })
  } catch (err) {
    next(err)
  }
}
