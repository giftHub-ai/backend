const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/Errorhandler");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");

exports.isAuthenticated = CatchAsyncError(async (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    console.log(authHeader);
    
    let token= null;
    if (!authHeader) {
        return next(new ErrorHandler("not logged in"), 401)
    }
    if (authHeader) {
       token = authHeader.split(' ')[1];
        console.log(token);
        req.token = token;
        
    }
    

    const decoded = await jwt.verify(token, process.env.JWTSECRET);

    req.user = await User.findById(decoded._id);
    next();

})


exports.isAuthorizedadmin = CatchAsyncError(async (req, res, next) => {
    if (req.user.role != "admin") {
        return next(new ErrorHandler("You are not allowed to perform this action", 403))
    }
    next();

})