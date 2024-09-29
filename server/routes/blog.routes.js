const express = require('express')
const BlogController = require('../controller/blog.controller');
const { upload } = require('../middleware/multer');
const router = express.Router()
// Get
router.get('/', BlogController.getAll)
router.get('/:id', BlogController.getOne);
router.get('/userProduct/:posterId', BlogController.getAllUsersData);
// Post
router.post('/', upload.single("blogImage"), BlogController.add);
// Put
router.put('/:id', upload.single("blogImage"), BlogController.edit);
router.put('/watchers/:id', BlogController.incrementWatch)
// Delete
router.delete('/:id', BlogController.delete);

module.exports = router;