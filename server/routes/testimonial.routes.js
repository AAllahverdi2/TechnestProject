const express = require('express')
const TestimonialController = require('../controller/testimonial.controller')
const { upload } = require('../middleware/multer')
const router = express.Router()

// Get
router.get('/', TestimonialController.getAll)
router.get('/:id', TestimonialController.getOne)
// Post
router.post('/', upload.single("userImage"), TestimonialController.add)
// Put
router.put('/:id', upload.single("userImage"), TestimonialController.edit)
// Delete
router.delete('/:id', TestimonialController.delete)

module.exports = router