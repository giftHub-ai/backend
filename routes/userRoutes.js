const express = require('express')
const router = express.Router()
const { register, login  } = require("../controllers/userControllers")
const { addToDatabase, getAllGift } = require("../controllers/user2Controllers")


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/addUser").post(addToDatabase);
router.route("/search/:_id").post(getAllGift)

module.exports = router;