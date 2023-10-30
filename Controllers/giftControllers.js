const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const Payment = require("../Model/paymentModel")
const giftModel = require("../middleware/giftModel")
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
        
        res.status(200).json({
            gifts
        })
       
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   

})

exports.mygift = CatchAsyncError(async(req,res,next)=>{
    try {
    const gifts = await giftModel.find({ Sender :req.user._id});

    if (!gifts) {
        return next(new ErrorHandler("No gift sent", 400))
    }
    res.status(200).json({
        gifts
    })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

exports.giftstatus = CatchAsyncError(async (req, res, next) => {
            const _id = req.params.id;
            const {status} = req.body;

           try {
        const gifts = await giftModel.find({ _id:_id });
console.log("gifts  ",gifts);
        if (!gifts) {
            return next(new ErrorHandler("No gift Found", 400))
        }
        gifts[0].Status = status;
        await gifts[0].save();
        console.log("gifts Saved ",gifts[0]);
        res.status(200).json({
            gifts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})