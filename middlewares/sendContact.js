const nodemailder = require("nodemailer")

const sendContact = async (options) => {
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
        from: options.email,
        to: process.env.SMTP_EMAIL,
        subject: options.subject,
        text: options.message,
    })
}

module.exports = sendContact;