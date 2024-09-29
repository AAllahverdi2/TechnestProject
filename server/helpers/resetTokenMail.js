const nodemailer = require('nodemailer');
const handleResetToken = require('../templates/html/resetTokenMailTemplate');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL__USERNAME,
        pass: process.env.EMAIL__PASSWORD
    }
});

const sendResetEmail = (userEmail, resetToken) => {
    const mailOptions = {
        from: process.env.EMAIL__USERNAME,
        to: userEmail,
        subject: 'Password Reset',
        html: handleResetToken(resetToken)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendResetEmail;