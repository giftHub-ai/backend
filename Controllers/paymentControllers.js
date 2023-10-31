const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const crypto = require("crypto")
const Payment = require("../Model/paymentModel")
const giftModel = require("../middleware/giftModel")
const jwt = require("jsonwebtoken");
const { instance } = require("../index");
const { link } = require("fs");


const {sendMail,ReceveEmail, ReturnedEmail} = require("../utils/EmailSend")

exports.BuyGift = CatchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user._id);
    const {email,Amount,ImageLink,giftName} = req.body;


    const PaymentsDetails = await instance.orders.create({
        amount: Number(Amount),
        currency: "INR",
    });
    let gift = await User.findOne({ order_id:PaymentsDetails._id });
      
   gift =  await giftModel.create({
    senderName:req.user.name,
        Sender:req.user._id,
        Recevier:email,
        giftName:giftName,
        ImageLink:ImageLink,
        order_id:PaymentsDetails.id

    })
    
    
    console.log(PaymentsDetails)

    res.status(200).json({
        sucess: true,
        PaymentsDetails
    })

})

exports.paymentVerification = CatchAsyncError(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    const token = req.params.token;          
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findById(decoded._id);

    const  uuser = await User.findById(user._id);

        // console.log(req.body)
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.Key_secret)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here

       const a = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        console.log(a)
        const gifts = await giftModel.findOne({order_id:razorpay_order_id});
console.log(gifts);
        gifts.Status = "ordered";
        gifts.Payments = a._id;
        await gifts.save();

        sendMail(uuser.email,gifts.senderName);
         ReceveEmail(gifts.Recevier,uuser.name);

        res.redirect(
            `http://127.0.0.1:5173/dashboard`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
});
exports.refund = CatchAsyncError(async (req, res, next) => {
        const orderID = req.params.id;
        try {
            let payment = await Payment.findOne({ razorpay_order_id : orderID})
            const gap = Date.now() - payment.createdAt;

            const refundTime = 5 * 24 * 60 * 60 * 1000;
            

            if (refundTime < gap) {
                return next(new ErrorHandler("No refund can be done", 400))
                
                
            }
            await razorpay.payments.refund(orderID);
            let gifts = await giftModel.findOne({ Payments:payment._id});
            // const gift = gifts;
            console.log(gifts);
            // await payment.remove();

            gift.Status = 'Returned';
            await gift.save();
            let user = await User.findById({_id:gift.sender})
            ReturnedEmail(user.email, req.user.name)


            // await gift.remove();

            res.status(200).json({
                sucess: true,
                message: "Subscription cancelled,You will recive full payment"
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


   


})
