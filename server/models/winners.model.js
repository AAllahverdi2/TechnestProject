const mongoose = require('mongoose');
const WinnersSchema = require('../schema/winners.schema');

const WinnerModel = mongoose.model('Winners', WinnersSchema)
module.exports=WinnerModel;