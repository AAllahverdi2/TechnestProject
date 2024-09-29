const express = require('express');
const OrderController = require('../controller/order.controller');
const router = express.Router();

// Get
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getOne)
router.get('/userOrders/:orderedUserId', OrderController.getAllUsersData)
// Post
router.post('/', OrderController.add)
// Put
router.put('/orderStatus/:id', OrderController.updateStatus);
router.put('/:id', OrderController.update)
// Delete
router.delete('/:id', OrderController.delete)

module.exports = router;