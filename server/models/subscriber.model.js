const mongoose = require('mongoose');
const SubscriberSchema = require('../schema/subscriber.schema');


const SubscriberModel = mongoose.model('Subscriber', SubscriberSchema);

module.exports = SubscriberModel;