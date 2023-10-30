const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const { connectDb } = require("./config/database")
const cors = require("cors")
const path = require('path');

const razorpay = require("razorpay")
require("dotenv").config({
    path: "./config/config.env"
});
connectDb();
app.use(cookie())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const viewPath = path.resolve(__dirname, './templates/views/');
app.use(express.static(path.join(__dirname, './public')))
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./templates/views/"))
exports.instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
})

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"]
}))

const userroute = require("./Router/userRoutes");
const paymentroutes = require("./Router/paymentRoutes")
const giftroutes = require("./Router/giftRoutes")

app.use("/user", userroute);
app.use("/payment",paymentroutes)
app.use("/gift",giftroutes)
app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.key_id })
);

app.listen(process.env.PORT, () => {
    console.log("working")
})
