const nodemailer = require('nodemailer');
const handleSendMail = require('../templates/html/sendMailTemplate');
require('dotenv').config()

async function sendContactMail(email, name, content) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL__USERNAME,
            pass: process.env.EMAIL__PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL__USERNAME,
        subject: 'New Contact Form Submission',
        html: handleSendMail(name, email, content)
        ,
    };

    await transporter.sendMail(mailOptions);



}

module.exports = sendContactMail