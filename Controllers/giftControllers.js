const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const Payment = require("../Model/paymentModel")
const giftModel = require("../Model/giftModel")
const { instance } = require("../index");
const { link } = require("fs");

const sendEmail = require("../utils/EmailSend")

exports.getGift = CatchAsyncError( async (req,res,next)=>{
    try {
        const user = await User.findById(req.user._id);
        const gifts = await giftModel.find({
            $and: [
                { Recevier: user.email },
                { Status: "ordered" }
            ]
        })


        if(!gifts){
            return next(new ErrorHandler("No gift recevied", 400))
        }

        res.Status(200).json({
            gifts
        })
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   

})

exports.Mygift = CatchAsyncError(async(req,res,next)=>{
    try {
    const gifts = await giftModel.find({ Sender :req.user._id});

    if (!gifts) {
        return next(new ErrorHandler("No gift sent", 400))
    }
    res.Status(200).json({
        gifts
    })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }



})

exports.giftStatus = CatchAsyncError(async (req, res, next) => {
            const _id = req.params.id;
            const {stauts} = req.body;

    try {
        const gifts = await giftModel.find({ _id:_id });

        if (!gifts) {
            return next(new ErrorHandler("No gift Found", 400))
        }
        giftModel.status = stauts;
        await gifts.save();
        res.Status(200).json({
            gifts
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }



})