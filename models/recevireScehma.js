const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userScema2 = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    senderEmail: {
        type: String,
        required: true,
       

    },
    recevierEmail: {
        type: String,
       required:true
    },
    giftName:{
        type:String,
        required:true,
    },
     giftLink: {
        type: String,
        required: true,
    },
    giftImage: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
})




module.exports = mongoose.model("user2", userScema2);