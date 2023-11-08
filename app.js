const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { connectDatabase } = require("./config/database")
const userRoute = require("./routes/userRoute")
const errorMiddleware = require("./middlewares/errorMiddleware")
const cookieParser = require("cookie-parser")
const cloudinary = require("cloudinary")
const cors = require("cors")
const path = require("path")

// Environmental variables
dotenv.config({ path: "config/config.env" })

// Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
})
// Connecting Database

connectDatabase()


app.use(express.urlencoded({ extended: false, limit: "10mb" }))
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())
app.use(cors({ credentials: true}))

// Routes
app.use(userRoute)

// Error Middleware
app.use(errorMiddleware)

const port = process.env.PORT || 4000


app.use(express.static(path.join(__dirname, "./frontend/dist")))


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html")), (err) => {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`Server is working on port:${port}`)
})
