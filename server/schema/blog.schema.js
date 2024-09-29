const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    blogTitle: String,
    blogTitle2: String,
    blogSmallContent: String,
    blogContent: [{ type: String }],
    posterImage: String,
    posterName: String,
    blogImage: String,
    watchers: Number,

}, { versionKey: false, timestamps: true })

module.exports = BlogSchema