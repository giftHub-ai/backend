const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const crypto = require("crypto")

const GiftSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default:null
    },
    Recevier: {
      type:String
    },
    giftName:{
        type:String,
    },
    Status:{
        type:String,
        enum: ["Delivered","Returned","Pending","ordered"],
        default: "Pending",
    },
    Link:{
        type:String
    },
    Payments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payments',
        default:null
    },
    order_id:{
        type:String
    }
},
    {
        timestamps: true

    })



module.exports = new mongoose.model('gift', GiftSchema);