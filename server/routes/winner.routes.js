const express = require('express')
const WinnerController = require('../controller/winner.controller')
const { upload } = require('../middleware/multer')
const router = express.Router()

// Get 
router.get('/', WinnerController.getAll)
router.get('/:id', WinnerController.getOne)
// Post
router.post('/', upload.single("winnerImage"), WinnerController.add)
// Put 
router.put('/:id', upload.single("winnerImage"), WinnerController.edit)
// Delete
router.delete('/:id', WinnerController.delete)
module.exports = router