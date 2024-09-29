const express = require('express');
const { upload } = require('../middleware/multer');
const BidHistoryController = require('../controller/bidHistory.controller');
const router = express.Router();

// Get
router.get('/', BidHistoryController.getAll);
router.get('/:id', BidHistoryController.getOne);
router.get('/product/:prodId', BidHistoryController.getAllProductData);
// Post
router.post('/', BidHistoryController.add);
// Delete
router.delete('/:id', BidHistoryController.delete);

module.exports = router;