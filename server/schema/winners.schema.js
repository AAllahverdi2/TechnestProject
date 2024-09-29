const mongoose = require('mongoose');
const WinnersSchema = new mongoose.Schema({
    winnerImage: String,
    winnerTitle: String,
    winnerRating: Number,
}, { versionKey: false })

module.exports = WinnersSchema