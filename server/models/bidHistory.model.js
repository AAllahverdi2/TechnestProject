const mongoose = require('mongoose')
const BidHistorySchema = require('../schema/bidHistory.schema')

const BidHistoryModel = mongoose.model('BidHistory', BidHistorySchema)

module.exports = BidHistoryModel