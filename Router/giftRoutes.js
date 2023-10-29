const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth")
const { etGift, getGift }= require("../Controllers/giftControllers")

router.route("./getgift").post(isAuthenticated,getGift)




module.exports = router;