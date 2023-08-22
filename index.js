const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const { connectDb } = require("./config/database")
const cors = require("cors")
const razorpay = require("razorpay")
require("dotenv").config({
    path: "./config/config.env"
});
connectDb();
app.use(cookie())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
exports.instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
})


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"]
}))

const userroute = require("./Router/userRoutes");
const paymentroutes = require("./Router/paymentRoutes")

app.use("/user", userroute);
app.use("/payment",paymentroutes)
app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.key_id })
);

app.listen(process.env.PORT, () => {
    console.log("working")
})
