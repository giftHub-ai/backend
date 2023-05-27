const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userScema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 1024
    },

}, {
    timestamps: true,
})

userScema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userScema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userScema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWTSECRET, {
        expiresIn: "15d",
    })
}


module.exports = mongoose.model("user", userScema);