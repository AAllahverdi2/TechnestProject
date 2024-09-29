
const TestimonialModel = require("../models/testimonial.model");
const TestimonialController = {
    getAll: async (req, res) => {
        try {
            const testimonials = await TestimonialModel.find({})
            res.status(200).send(testimonials)

        } catch (err) {
            res.status(404).send('Error In Getting All Testimonials' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const testimonial = await TestimonialModel.findById(id)
            res.status(200).send(testimonial)

        } catch (err) {
            res.status(404).send('Error In Getting One Testimonial' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteTestimonial = await TestimonialModel.findByIdAndDelete(id)
            res.send(deleteTestimonial)

        } catch (err) {
            res.status(404).send('Error In Deleting Testimonial' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const { testimonialTitle, description, userProfession, testimonialRating, userTitle } = req.body
            const updateData = {
                testimonialTitle: testimonialTitle,
                description: description,
                userProfession: userProfession,
                testimonialRating: testimonialRating,
                userTitle: userTitle
            };
            if (req.file) {
                updateData.userImage = req.file.filename;
            }
            await TestimonialModel.findByIdAndUpdate(id, updateData)
            const updatedTestimonial = await TestimonialModel.findById(id)
            res.status(200).send(updatedTestimonial)
        } catch (err) {
            res.status(404).send('Error In Editing Testimonial' + err)
        }
    },
    add: async (req, res) => {
        try {
            const { testimonialTitle, description, userProfession, testimonialRating, userTitle } = req.body
            const newTestimonial = new TestimonialModel({
                testimonialTitle: testimonialTitle,
                description: description,
                userImage: req.file.filename,
                userProfession: userProfession,
                testimonialRating: testimonialRating,
                userTitle: userTitle
            })
            await newTestimonial.save()
            res.status(200).send(newTestimonial)
        } catch (err) {
            res.status(404).send('Error In Posting Testimonial' + err)
        }
    },
}

module.exports = TestimonialController