const mongoose = require('mongoose')
const QuestionSchema = require('../schema/question.schema')

const QuestionModel = mongoose.model('Question', QuestionSchema)

module.exports = QuestionModel