const mongoose = require('mongoose')
const ManagementSchema = require('../schema/management.schema')

const ManagementModel = mongoose.model('Management', ManagementSchema)
module.exports = ManagementModel