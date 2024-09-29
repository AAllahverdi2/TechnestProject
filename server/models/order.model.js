const OrderSchema = require("../schema/order.schema");
const mongoose = require("mongoose");

const OrderModel = mongoose.model("Orders", OrderSchema)
module.exports = OrderModel