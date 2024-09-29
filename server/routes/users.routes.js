const express = require('express');
const UserController = require('../controller/users.controller');
const protect = require('../middleware/auth.middleware');
const { upload } = require('../middleware/multer');
const router = express.Router()

// Get 
router.get('/', UserController.getAll)
// Post
router.post('/register', upload.single('profileImage'), UserController.register)
router.post('/login', UserController.login)
router.post('/forgot-password', UserController.forgotPasswords);
// Get
router.get('/getMe', protect, UserController.getMe)
// Put
router.put('/changePassword/:id', UserController.changePassword)
router.put('/:id', upload.single('profileImage'), UserController.editUser);
// Delete
router.delete('/:id', UserController.deleteUser)
// Get
router.get('/:id', UserController.getOne)

// Wishlist Routes
router.put('/addToWishlist/:productId', protect, UserController.addToWishlist);
router.put('/removeFromWishlist/:productId', protect, UserController.removeFromWishlist);



// Basket Routes
router.put('/addToBasket/:productId', protect, UserController.addToBasket);
router.put('/removeFromBasket/:productId', protect, UserController.removeFromBasket);
router.put('/clearBasket/:userId', protect, UserController.clearUserBasket);

// Winning Product
router.put('/addToWinningProduct/:productId', protect, UserController.addToWinningProduct);
router.put('/clearWinningProduct/:userId', protect, UserController.clearUserWinningProduct);

module.exports = router
