const mongoose = require("mongoose")

exports.connectDatabase = () => {
    mongoose.connect(process.env.DB).then((db) => {
        console.log(`Mongodb connected with ${db.connection.host}`)
    }).catch((err) => {
        console.log(`Failed to connection mongodb: ${err.message}`)
    })
}
