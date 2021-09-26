const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true },
  date: { default: Date.now(), type: Date },
  text: { type: String, required: true },
  author_name: { required: true, type: String },
  published: { type: Boolean, default: false },
})

PostSchema.virtual('date_formatted').get(function () {
  return this.date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minutes: '2-digit',
  })
})

const Posts = mongoose.model('Post', PostSchema)
module.exports = Posts
