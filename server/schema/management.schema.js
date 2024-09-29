const mongoose = require('mongoose')

const ManagementSchema = new mongoose.Schema({
    managementImage: String,
    managementTitle: String,
    managementProfession: String,
    managementContent: String,
    managementInstagram: String,
    managementTwitter: String,
    managementFacebook: String,
    managementLinkedin: String,
}, { versionKey: false })

module.exports = ManagementSchema