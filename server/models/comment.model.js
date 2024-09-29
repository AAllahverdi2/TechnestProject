const mongoose = require('mongoose')
const CommentSchema = require('../schema/comment.schema')

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel