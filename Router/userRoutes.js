const express = require("express");
const router = express.Router();
const { register, login, logout,Product } = require("../Controllers/userControllers")
const { isAuthenticated} = require("../middleware/auth")



router.route("/register").post(register)
router.route("/getProduct").post(Product)
router.route("/login").post(login)
router.route("/logout").get(logout)  

module.exports = router;