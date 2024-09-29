const mongoose = require('mongoose')

const WinningProductSchema = new mongoose.Schema({
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    winnerName: String,
    winnerGmail: String,
    product: {
        type: [Object], 
        default: [],
      },
      productBidders: {
        type: [Object],
        default: [],
      },
}, { versionKey: false, timestamps: true })

module.exports = WinningProductSchema