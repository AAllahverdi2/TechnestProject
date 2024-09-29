const QuestionModel = require("../models/question.model");
const QuestionController = {
    getAll: async (req, res) => {
        try {
            const questions = await QuestionModel.find({})
            res.status(200).send(questions)

        } catch (err) {
            res.status(404).send('Error In Getting All Questions' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const question = await QuestionModel.findById(id)
            res.status(200).send(question)

        } catch (err) {
            res.status(404).send('Error In Getting One Question' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteQuestion = await QuestionModel.findByIdAndDelete(id)
            res.send(deleteQuestion)

        } catch (err) {
            res.status(404).send('Error In Deleting Question' + err)
        }
    },
    add: async (req, res) => {
        try {
            const { questionTitle, questionContent, questionRating } = req.body
            const newQuestion = new QuestionModel({
                questionTitle: questionTitle,
                questionContent: questionContent,
                questionRating: questionRating,

            })
            await newQuestion.save()
            res.status(200).send(newQuestion)
        } catch (err) {
            res.status(404).send('Error In Posting Question' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const { questionTitle, questionContent, questionRating } = req.body

            await QuestionModel.findByIdAndUpdate(id, {
                questionTitle: questionTitle,
                questionContent: questionContent,
                questionRating: questionRating,
            })
            const updatedQuestion = await QuestionModel.findById(id)
            res.status(200).send(updatedQuestion)
        } catch (err) {
            res.status(404).send('Error In Editing Question' + err)
        }
    },
}

module.exports =QuestionController