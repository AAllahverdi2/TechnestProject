const WinnerModel = require("../models/winners.model");
const WinnerController = {
    getAll: async (req, res) => {
        try {
            const winners = await WinnerModel.find({})
            res.status(200).send(winners)

        } catch (err) {
            res.status(404).send('Error In Getting All Winners' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const winner = await WinnerModel.findById(id)
            res.status(200).send(winner)

        } catch (err) {
            res.status(404).send('Error In Getting One Winner' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteWinner = await WinnerModel.findByIdAndDelete(id)
            res.send(deleteWinner)

        } catch (err) {
            res.status(404).send('Error In Deleting Winner' + err)
        }
    },
    add: async (req, res) => {
        try {
            const { winnerTitle, winnerRating } = req.body
            const newWinner = new WinnerModel({
                winnerRating: winnerRating,
                winnerTitle: winnerTitle,
                winnerImage: req.file.filename,

            })
            await newWinner.save()
            res.status(200).send(newWinner)
        } catch (err) {
            res.status(404).send('Error In Posting Winner' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const { winnerTitle, winnerRating } = req.body
            const updateData = {
                winnerRating: winnerRating,
                winnerTitle: winnerTitle,
            }
            if (req.file) {
                updateData.winnerImage = req.file.filename;
            }
            await WinnerModel.findByIdAndUpdate(id, updateData)
            const updateWinner = await WinnerModel.findById(id)
            res.status(200).send(updateWinner)
        } catch (err) {
            res.status(404).send('Error In Editing Winner' + err)
        }
    },
}

module.exports = WinnerController