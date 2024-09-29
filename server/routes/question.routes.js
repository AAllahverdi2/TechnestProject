const express = require('express')
const QuestionController = require('../controller/question.controller')
const router = express.Router()
// Get
router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)
// Post
router.post('/', QuestionController.add)
// Delete
router.delete('/:id', QuestionController.delete)
// Put
router.put('/:id', QuestionController.edit)

module.exports = router