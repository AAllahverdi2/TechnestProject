const express = require("express");
const WinningProductController = require("../controller/winningProduct.controller");
const router = express.Router()
// Get  
router.get('/', WinningProductController.getAll)
router.get('/:id', WinningProductController.getOne)
router.get('/userWinningProducts/:winnerId', WinningProductController.getAllUsersWinningProduct)
// Post
router.post('/', WinningProductController.add)
// Delete
router.delete('/:id', WinningProductController.delete)
// Put 
router.put('/:id', WinningProductController.update)

module.exports = router