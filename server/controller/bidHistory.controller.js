const BidHistoryModel = require("../models/bidHistory.model");

const BidHistoryController = {
    getAll: async (req, res) => {
        try {
            const bidHistory = await BidHistoryModel.find({})
            res.status(200).send(bidHistory)

        } catch (err) {
            res.status(404).send('Error In Getting All Bids History' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const bidHistory = await BidHistoryModel.findById(id)
            res.status(200).send(bidHistory)

        } catch (err) {
            res.status(404).send('Error In Getting One Bid History' + err)
        }
    },
    getAllProductData: async (req, res) => {
        try {
            const prodId = req.params.prodId;
            const bidsWithProducts = await BidHistoryModel.find({ prodId: prodId })
            res.status(200).send(bidsWithProducts)

        } catch (err) {
            res.status(404).send('Error In Getting All Products Data' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteProduct = await BidHistoryModel.findByIdAndDelete(id)
            res.send(deleteProduct)

        } catch (err) {
            res.status(404).send('Error In Deleting Product' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                bidHistoryProductImage,
                bidHistoryProfImage,
                productBidPrice,
                bidderName,
                prodId,
                usersId
            } = req.body;
       
            const newBidHistory = new BidHistoryModel({
                bidHistoryProductImage: bidHistoryProductImage,
                bidHistoryProfImage: bidHistoryProfImage,
                productBidPrice: productBidPrice,
                bidderName: bidderName,
                prodId: prodId,
                usersId: usersId,
            });

            await newBidHistory.save();
            res.status(201).send(newBidHistory);
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Posting Bids History: ' + err);
        }
    },


}


module.exports = BidHistoryController