const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    subscriberGmail: String
}, { versionKey: false, timestamps: true })


module.exports = SubscriberSchema
