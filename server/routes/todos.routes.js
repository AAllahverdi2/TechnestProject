const express = require('express')
const TodosController = require('../controller/todos.controller')
const router = express.Router()

// Get  
router.get('/', TodosController.getAll)
router.get('/:id', TodosController.getOne)
router.get('/userTodos/:todoPosterId', TodosController.getAllUserTodos)
// Post
router.post('/', TodosController.add)
// Deletee
router.delete('/:id', TodosController.delete)
// Put 
router.put('/:id', TodosController.update)
module.exports = router