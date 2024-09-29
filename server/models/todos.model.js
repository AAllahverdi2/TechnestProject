const mongoose = require('mongoose')
const TodosSchema = require('../schema/todos.schema')

const TodosModel = mongoose.model('Todos', TodosSchema)

module.exports = TodosModel