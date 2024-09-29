const ManagementModel = require("../models/management.model")

const ManagementController = {
    getAll: async (req, res) => {
        try {
            const managements = await ManagementModel.find({})
            res.status(200).send(managements)

        } catch (err) {
            res.status(404).send('Error In Getting All Managements' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const management = await ManagementModel.findById(id)
            res.status(200).send(management)

        } catch (err) {
            res.status(404).send('Error In Getting One Management' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteManagement = await ManagementModel.findByIdAndDelete(id)
            res.send(deleteManagement)

        } catch (err) {
            res.status(404).send('Error In Deleting Management' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const { managementTitle, managementFacebook, managementLinkedin, managementTwitter, managementProfession, managementContent, managementInstagram } = req.body

            const updateData = {
                managementTitle: managementTitle,
                managementProfession: managementProfession,
                managementContent: managementContent,
                managementInstagram: managementInstagram,
                managementTwitter: managementTwitter,
                managementFacebook: managementFacebook,
                managementLinkedin: managementLinkedin
            }
            if (req.file) {
                updateData.managementImage = req.file.filename;
            }
            await ManagementModel.findByIdAndUpdate(id, updateData)
            const updateManagement = await ManagementModel.findById(id)
            res.status(200).send(updateManagement)
        } catch (err) {
            res.status(404).send('Error In Editing Management' + err)
        }
    },
    add: async (req, res) => {
        try {
            const { managementTitle, managementFacebook, managementLinkedin, managementTwitter, managementProfession, managementContent, managementInstagram } = req.body
            const newManagement = new ManagementModel({
                managementTitle: managementTitle,
                managementProfession: managementProfession,
                managementImage: req.file.filename,
                managementContent: managementContent,
                managementInstagram: managementInstagram,
                managementTwitter: managementTwitter,
                managementFacebook: managementFacebook,
                managementLinkedin: managementLinkedin
            })
            await newManagement.save()
            res.status(200).send(newManagement)
        } catch (err) {
            res.status(404).send('Error In Posting Management' + err)
        }
    },
}

module.exports = ManagementController