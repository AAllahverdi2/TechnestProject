const mongoose = require('mongoose');
const WinningProductSchema = require('../schema/winningProduct.schema');

const WinningProductModel = mongoose.model('WinningProduct', WinningProductSchema)
module.exports = WinningProductModel