const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const ErrorHandler = require("../utils/ErrorHandler")

const authentication = async (req, res, next) => {
    try {

        const { token } = req.cookies
        if (!token) {
            return next(new ErrorHandler("Please Login First", 401))
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodeToken.id)
        req.user = user
        next()
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}



module.exports = authentication