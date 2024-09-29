const TodosModel = require("../models/todos.model");

const TodosController = {
    getAll: async (req, res) => {
        try {
            const todos = await TodosModel.find({})
            res.status(200).send(todos)

        } catch (err) {
            res.status(404).send('Error In Getting All Todos' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const todo = await TodosModel.findById(id)
            res.status(200).send(todo)

        } catch (err) {
            res.status(404).send('Error In Getting One Todo' + err)
        }
    },
    getAllUserTodos: async (req, res) => {
        try {
            const todoPosterId = req.params.todoPosterId;
            const todos = await TodosModel.find({ todoPosterId: todoPosterId })
            res.status(200).send(todos)

        } catch (err) {
            res.status(404).send('Error In Getting All User Todos' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteTodo = await TodosModel.findByIdAndDelete(id)
            res.send(deleteTodo)

        } catch (err) {
            res.status(404).send('Error In Deleting Todo' + err)
        }
    },

    add: async (req, res) => {

        try {
            const {
                addedTodo,
                todoContent,
                isCompleted,
                todoPosterId
            } = req.body
            const newTodo = new TodosModel({
                addedTodo: addedTodo,
                todoContent: todoContent,
                isCompleted: isCompleted,
                todoPosterId: todoPosterId
            });


            await newTodo.save();
            res.status(201).send(newTodo);
        } catch (err) {
            res.status(400).send('Error In Posting Todo ' + err);
        }

    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const {
                addedTodo,
                todoContent,
                isCompleted,
                todoPosterId
            } = req.body
            const updateData = {
                addedTodo: addedTodo,
                todoContent: todoContent,
                isCompleted: isCompleted,
                todoPosterId: todoPosterId
            };
            await TodosModel.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            const updateTodo = await TodosModel.findById(id)
            res.status(200).send(updateTodo)
        } catch (err) {
            res.status(404).send('Error In Editing Todo' + err)
        }
    },
}

module.exports = TodosController;