const express = require('express');
const ManagementController = require('../controller/management.controller');
const { upload } = require('../middleware/multer');
const router = express.Router()
// Get
router.get('/', ManagementController.getAll)
router.get('/:id', ManagementController.getOne)
// Post
router.post('/', upload.single("managementImage"), ManagementController.add)
// Put
router.put('/:id', upload.single("managementImage"), ManagementController.edit)
// Delete
router.delete('/:id', ManagementController.delete)

module.exports = router