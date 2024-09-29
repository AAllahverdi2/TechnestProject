const mongoose = require('mongoose');
const ProductModel = require('../models/product.model');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userGmail: String,
    profileImage: String,
    birthdayDay: String,
    birthdayMonth: String,
    birthdayYear: String,
    address: String,
    language: String,
    isAdmin: Boolean,
    isLogin: Boolean,
    isVerified: Boolean,
    superAdmin: Boolean,
    status: Boolean,
    password: String,
    phoneNumber: String,
    activeBids: Number,
    winningBids: Number,
    bidsInWishlist: Number,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuctionProduct' }],
    basket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuctionProduct' }],
    winningProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WinningProduct' }],
    resetPasswordToken: {
        type: String,
        default: undefined,
    },
    resetPasswordExpires: {
        type: Date,
        default: undefined,
    },
}, { versionKey: false })
module.exports = UserSchema;