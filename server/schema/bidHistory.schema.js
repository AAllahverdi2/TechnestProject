const mongoose = require('mongoose')
const BidHistorySchema = new mongoose.Schema({
    bidHistoryProfImage: String,
    bidHistoryProductImage: String,
    productBidPrice: Number,
    bidderName: String,
    prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionProduct' },
    usersId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
}, { versionKey: false, timestamps: true })

module.exports = BidHistorySchema