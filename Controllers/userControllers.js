const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const { sendToken } = require("../utils/SendToken");
const mongoose = require("mongoose")
const { MongoClient } = require('mongodb');

exports.Product = CatchAsyncError(async(req,res,next)=>{
    const client = new MongoClient(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
    const {Gift} = req.body;
    try {
        await client.connect();
        console.log('Connected to the database');

        const db = client.db('flask_db');

        // Access the collection
        const collection = db.collection('Database');

        // Perform operations on the collection
        const documents = await collection.find({});
        console.log(documents)
        res.json({
            documents
        })

    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await client.close();
    }

})

exports.register = CatchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    console.log(req.body);

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please addd all field", 400))
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User alerdy exist"), 409)
    }


    
    user = await User.create({
        name,
        email,
        password,
    })

    sendToken(res, user, "Registerred Succesfully", 201);
})


exports.login = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please addd all field", 400))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400))
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorHandler(" Incoreect Email or password  "))
    }

    sendToken(res, user, "Welcome back",)

})

exports.logout = CatchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        sucess: true,
        message: "logout"
    })

})