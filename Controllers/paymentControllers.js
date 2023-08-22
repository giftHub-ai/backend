const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const crypto = require("crypto")
const Payment = require("../Model/paymentModel")
const giftModel = require("../Model/giftModel")

const { instance } = require("../index");
const { link } = require("fs");


exports.BuyGift = CatchAsyncError(async (req, res, next) => {
    // const user = await User.findById(req.user._id);
    // const {email,link,Amount,Name} = req.body;



    // if (user.role == "admin") {
    //     return next(new ErrorHandler("admin cannot buy", 400))
    // }
    console.log("ih")

    const PaymentsDetails = await instance.orders.create({
        amount: Number(req.body.amount * 100),
        currency: "INR",
    });
    let gift = await User.findOne({ order_id:PaymentsDetails._id });
      
   gift =   await giftModel.create({
        // sender:req.user._id,
        Recevier:"gamokn@rknec.edu",
        giftName:"trial gift",
        Link:"https://instagram.com",
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

        console.log(req.body)
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
        const gift = await giftModel.findOne({order_id:razorpay_order_id});
        gift.Status = "ordered"
        gift.Payments = a._id
        await gift.save();

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
});
exports.refund = CatchAsyncError(async (req, res, next) => {
        const orderID = req.body.order_id;

        try {
            let payment = await Payment.findOne({ razorpay_order_id : orderID})
            const gap = Date.now() - payment.createdAt;

            const refundTime = 5 * 24 * 60 * 60 * 1000;

            if (refundTime > gap) {
                await razorpay.payments.refund(orderID);
                return true;
            }

            let gift = await giftModel.findOne({ Payments:payment._id});
            await payment.remove();
            await gift.remove();

            res.status(200).json({
                sucess: true,
                message: "Subscription cancelled,You will recive full payment"
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


   


})
