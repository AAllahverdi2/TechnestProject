const sendContactMail = require("../helpers/sendEmail");


const ContactController = {
    post: async (req, res) => {
        try {
            const {
                contactName,
                contactEmail,
                contactContent,
            } = req.body
            sendContactMail(contactEmail, contactName, contactContent)
            res.status(200).send({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

module.exports = ContactController;