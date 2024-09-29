const mongoose = require('mongoose');
const TestimonialSchema = require('../schema/testimonial.schema');

const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema)

module.exports =TestimonialModel