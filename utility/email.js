const nodemailer = require('nodemailer');
const { handleError, sendResponse } = require('./response-utility');

const sendEmail = async (options, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        sendTimeout: 10000,
    })
    const mailOptions = {
        from: "Komal <komalp@techoon.in>",
        to: options.userEmail,
        subject: options.subject,
        text: options.message,
        html: options.isHtml ? options.message : undefined
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("error", error)
        sendResponse(res, 500, "fail", "There was an error sending the email. Try again later!");

    }
}


module.exports = sendEmail;
