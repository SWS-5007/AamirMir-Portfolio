const nodemailder = require("nodemailer")

const sendResetToken = async (options) => {
    const transport = nodemailder.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    })

    await transport.sendMail({
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    })
}

module.exports = sendResetToken