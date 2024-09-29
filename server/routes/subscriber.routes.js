const express = require('express');
const SubscriberController = require('../controller/subscriber.controller');
const router = express.Router()
// Get  
router.get('/', SubscriberController.getAll)
router.get('/:id', SubscriberController.getOne)
// Delete
router.delete('/:id', SubscriberController.delete)
// Post
router.post('/', SubscriberController.add)

module.exports = router