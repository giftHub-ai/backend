const express = require("express");
const router = express.Router();
const { BuyGift,paymentVerification,refund} = require("../Controllers/paymentControllers")
const { isAuthenticated } = require("../middleware/auth")



router.route("/buyGift").post(BuyGift);
router.route("/paymentverification").post(paymentVerification);
router.route("/refund").post(refund);


module.exports = router;