const SubscriberModel = require("../models/subscriber.model")

const SubscriberController = {
    getAll: async (req, res) => {
        try {
            const subscribers = await SubscriberModel.find({})
            res.status(200).send(subscribers)

        } catch (err) {
            res.status(404).send('Error In Getting All Subscribers' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const subscriber = await SubscriberModel.findById(id)
            res.status(200).send(subscriber)

        } catch (err) {
            res.status(404).send('Error In Getting One Subscriber' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteSubscriber = await SubscriberModel.findByIdAndDelete(id)
            res.send(deleteSubscriber)

        } catch (err) {
            res.status(404).send('Error In Deleting Subscriber' + err)
        }
    },
    add: async (req, res) => {
        try {
            const { subscriberGmail } = req.body
            const newSubscriber = new SubscriberModel({
                subscriberGmail: subscriberGmail
            })
            await newSubscriber.save()
            res.status(200).send(newSubscriber)
        } catch (err) {
            res.status(404).send('Error In Posting Subscriber' + err)
        }
    },

}

module.exports = SubscriberController