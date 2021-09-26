console.log('This script populates some test comments, posts and authors')

// Get arguments passed on command line
var userArgs = process.argv.slice(2)

var async = require('async')
var Author = require('./models/author')
var Comment = require('./models/comment')
var Post = require('./models/post')

var mongoose = require('mongoose')
var mongoDB = userArgs[0]
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var authors = []
var comments = []
var posts = []

// authorCreate
function authorCreate(username, password, cb) {
  var author = new Author({ username, password })

  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author)
    authors.push(author)
    cb(null, author)
  })
}

// commentCreate
function commentCreate(text, user, cb) {
  var comment = new Comment({ text, user })

  comment.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Comment: ' + comment)
    comments.push(comment)
    cb(null, comment)
  })
}

// postCreate
function postCreate(title, text, author_name, cb) {
  var post = new Post({ title, text, author_name })

  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post)
    posts.push(post)
    cb(null, post)
  })
}

// Creating content
function createAuthor(cb) {
  async.series(
    [
      function (callback) {
        authorCreate('DevChaudhary78', 'Devc7854!', callback)
      },
    ],
    cb
  )
}

function createComment(cb) {
  async.series(
    [
      function (callback) {
        commentCreate('Thats really Great site💓', 'ValorantSucks', callback)
      },
    ],
    cb
  )
}

function createPost(cb) {
  async.series(
    [
      function (callback) {
        postCreate(
          'Great day',
          'Today is such a lovely day',
          'Dev Chaudhary',
          callback
        )
      },
    ],
    cb
  )
}

async.series(
  [createAuthor, createComment, createPost],
  function (err, resutls) {
    if (err) {
      console.log('Final Error: ' + err)
    } else {
      console.log('Done')
    }
    // All done, disconnet from database
    mongoose.connection.close()
  }
)
