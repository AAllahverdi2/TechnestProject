const express = require('express')
const ProductController = require('../controller/product.controller')
const { upload } = require('../middleware/multer')
const router = express.Router()

// Get
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne);
router.get('/userProduct/:userId', ProductController.getAllUsersData);
router.get('/biddersProduct/:bidderId', ProductController.getAllBiddersData);
// Post
router.post('/', upload.array("productImages", 10), ProductController.add);
// Put
router.put('/watchers/:id', ProductController.incrementWatch)
router.put('/:id', upload.array("productImages", 10), ProductController.update);
router.put('/increaseAfterPrice/:id', ProductController.increaseAfterPrice);
// Delete
router.delete('/:id', ProductController.delete);
router.post('/deleteMultiple', ProductController.deleteMultiple);

module.exports = router;