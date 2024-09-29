const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
    testimonialTitle: String,
    description: String,
    userImage: {
        type:String,
        default:''
    },
    userProfession: String,
    userTitle: String,
    testimonialRating: Number,

}, { versionKey: false })



module.exports = TestimonialSchema