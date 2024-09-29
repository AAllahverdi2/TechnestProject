const WinningProductModel = require("../models/winningProduct.model")

const WinningProductController = {
    getAll: async (req, res) => {
        try {
            const products = await WinningProductModel.find({})
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Winning Products' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const product = await WinningProductModel.findById(id)
            res.status(200).send(product)

        } catch (err) {
            res.status(404).send('Error In Getting One Winning Product' + err)
        }
    },
    getAllUsersWinningProduct: async (req, res) => {
        try {
            const winnerId = req.params.winnerId;
            const products = await WinningProductModel.find({ winnerId: winnerId })
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Users Winning Products' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteProduct = await WinningProductModel.findByIdAndDelete(id)
            res.send(deleteProduct)

        } catch (err) {
            res.status(404).send('Error In Deleting Winning Product' + err)
        }
    },
    add: async (req, res) => {

        try {
            const {
                winnerId,
                winnerName,
                winnerGmail,
                product,
                productBidders
            } = req.body
            const newProduct = new WinningProductModel({
                winnerId: winnerId,
                winnerName: winnerName,
                winnerGmail: winnerGmail,
                product: product, 
                productBidders: productBidders
            });
    

            await newProduct.save();
            res.status(201).send(newProduct);
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Posting Winning Product ' + err);
        }

    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const {
                winnerId,
                winnerName,
                winnerGmail,
                product,
                productBidders
            } = req.body
            const updateData = {
                winnerId: winnerId,
                winnerName: winnerName,
                winnerGmail: winnerGmail,
                product: product,
                productBidders: productBidders
            };
            await WinningProductModel.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            const updateWinningProduct = await WinningProductModel.findById(id)
            res.status(200).send(updateWinningProduct)
        } catch (err) {
            res.status(404).send('Error In Editing Winning Product' + err)
        }
    },

}


module.exports = WinningProductController