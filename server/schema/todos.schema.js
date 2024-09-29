const mongoose = require('mongoose')
const TodosSchema = new mongoose.Schema({
    addedTodo: String,
    todoContent: String,
    isCompleted: {
        type: Boolean,
        default: false
    },
    todoPosterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
}, { versionKey: false, timestamps: true })

module.exports = TodosSchema