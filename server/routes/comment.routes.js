const express = require('express')
const CommentController = require('../controller/comment.controller')
const router = express.Router()


// Get
router.get('/', CommentController.getAll)
router.get('/:id', CommentController.getOne)
router.get('/blogsComments/:blogId', CommentController.getAllBlogsComment)
// Delete
router.delete('/:id', CommentController.delete)

// Post
router.post('/', CommentController.add)

// Put 
router.put('/:id', CommentController.edit)

module.exports = router