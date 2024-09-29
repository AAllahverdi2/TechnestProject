const mongoose= require('mongoose')
const UserSchema = require('../schema/users.schema')

const UsersModel=mongoose.model('Users',UserSchema)

module.exports  = UsersModel