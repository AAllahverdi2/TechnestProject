const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionContent: String,
    questionRating: Number
}, { versionKey: false })

module.exports = QuestionSchema