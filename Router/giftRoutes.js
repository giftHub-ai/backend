const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth")
const { Mygift, getGift,giftStatus,getReturnedGift}= require("../Controllers/giftControllers")

router.route("/getgift").get(isAuthenticated,getGift)
router.route("/Mygift").get(isAuthenticated,Mygift)
router.route("/status/:id").post(isAuthenticated,giftStatus)
router.route("/ReturnedGift").get(isAuthenticated,getReturnedGift)





module.exports = router;