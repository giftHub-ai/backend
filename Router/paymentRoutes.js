const express = require("express");
const router = express.Router();
const { BuyGift,paymentVerification,refund} = require("../Controllers/paymentControllers")
const { isAuthenticated } = require("../middleware/auth")



router.route("/buyGift").post(isAuthenticated,BuyGift);
router.route("/paymentverification/:token").post(paymentVerification);
router.route("/refund/:id").post(isAuthenticated,refund);


module.exports = router;