const express = require('express')
const ContactController = require('../controller/contact.controller')
const router = express.Router()

// Post
router.post('/', ContactController.post)

module.exports = router