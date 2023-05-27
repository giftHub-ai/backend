const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/user", userRoutes)


mongoose.connect(process.env.MONGO_url).then(() => {
    console.log("sucessfully connected")
}).catch((error) => {
    console.log(error)
})


app.listen(process.env.PORT, () => {
    console.log(`port listening to ${process.env.PORT}`)
})