const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const Payment = require("../Model/paymentModel")
const giftModel = require("../middleware/giftModel")
const { instance } = require("../index");
const { link } = require("fs");

const {AcceptedEmail,ReturnedEmail}= require("../utils/EmailSend")

exports.getGift = CatchAsyncError( async (req,res,next)=>{
    // login user ke recived gift
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

exports.Mygift = CatchAsyncError(async(req,res,next)=>{
    // login user ne jo sent kiye hoge
    try {
    const gifts = await giftModel.find({Sender:req.user._id});

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

exports.giftStatus = CatchAsyncError(async (req, res, next) => {
            const _id = req.params.id;
           

    try {
        const gifts = await giftModel.find({ _id:_id });

        if (!gifts) {
            return next(new ErrorHandler("No gift Found", 400))
        }
        
        gifts[0].Status = "Accepted";
        console.log(gifts)
        await gifts[0].save();
        const a = await User.findById({_id:gifts[0].Sender})

        AcceptedEmail(a.email,req.user.name);

        res.status(200).json({
            sucess:true
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }



})

exports.getReturnedGift = CatchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const gifts = await giftModel.find({
            $and: [
                { Sender: user._id },
                { Status: "Returned" }
            ]
        })


        if (!gifts) {
            return next(new ErrorHandler("No gift returned", 400))
        }

        res.status(200).json({
            gifts
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


})