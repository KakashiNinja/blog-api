const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  date: { default: Date.now(), type: Date },
  text: { type: String, required: true },
  user: { required: true, type: String },
  postId: { required: true, type: String },
})

CommentSchema.virtual('date_formatted').get(function () {
  return this.date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minutes: '2-digit',
  })
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
