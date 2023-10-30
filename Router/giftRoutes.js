const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth")
const { mygift, getGift,giftstatus}= require("../Controllers/giftControllers")

router.route("/getgift").get(isAuthenticated,getGift)
router.route("/mygift").get(isAuthenticated,mygift)
router.route("/giftstatus/:id").post(isAuthenticated,giftstatus)




module.exports = router;