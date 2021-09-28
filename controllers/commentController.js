const { body, validationResult } = require('express-validator')
const Comment = require('../models/comment')

exports.create_comment = [
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
]

exports.get_comments = async (req, res, next) => {
  try {
    const comments = await Comment.find({})

    if (!comments) {
      res.status(404).json({ err: 'comments not found' })
    }
    res.status(200).json({ comments })
  } catch (err) {
    return next(err)
  }
}

exports.get_single_comment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentid)

    if (!comment) {
      res.status(404).json({ err: 'comment not found' })
    }

    res.status(200).json({ comment })
  } catch (err) {
    return next(err)
  }
}

exports.update_comment = async (req, res, next) => {
  try {
    const { user, text } = req.body

    const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
      user,
      text,
    })

    if (!comment) {
      res.status(404).json({ err: 'comment not found' })
    }
    res.status(200).json({ msg: 'comment updated successfully' })
  } catch (err) {
    return next(err)
  }
}

exports.delete_comment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentid)

    if (!comment) {
      res
        .status(404)
        .json({ err: `comment with id: ${req.params.commentid} not found` })
    }

    res.status(200).json({
      msg: `comment with id: ${req.params.commentid} successfully deleted`,
    })
  } catch (err) {
    return next(err)
  }
}
