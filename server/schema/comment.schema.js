const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blogs' },
    addedComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    blogPosterUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    commentedName: String,
    commentedProfileImage: String,
    commentContent: String,
    posterUserGmail: String,
}, { versionKey: false, timestamps: true })
module.exports = CommentSchema