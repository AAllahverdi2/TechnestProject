const mongoose = require('mongoose')
const BlogSchema = require('../schema/blog.schema')


const BlogModel = mongoose.model('Blogs', BlogSchema)

module.exports = BlogModel