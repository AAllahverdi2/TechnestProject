const mongoose = require('mongoose');
const ProductSchema = require('../schema/product.schema');

const ProductModel = mongoose.model('AuctionProduct', ProductSchema)
module.exports = ProductModel