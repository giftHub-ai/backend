const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const crypto = require("crypto")

const GiftSchema = new mongoose.Schema({
    senderName:{
        type: String
    },
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
        enum: ["Delivered","Returned","Pending","ordered","Accepted"],
        default: "Pending",
    },
    ImageLink: {
        type: String,
        default: null
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