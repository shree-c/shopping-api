const jwt = require('jsonwebtoken');
const User = require('../models/User');
//protect the routes
exports.protect = async (req, res, next) => {
    //extract the token if it is sent
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next(new Error('unauthorized access'));
    }
    //something wrong is sent
    if (!token) {
        return next(new ErrorResponse('unauthorized access', 401));
    }
    try {
        const tokencontents = jwt.verify(token, process.env.JWT_SECRET);
        //get the user from db and put it on req.user
        req.user = await User.findById(tokencontents.id);
        if (!req.user) {
            return next(new Error('internal server error'));
        }
        return next();
    } catch (error) {
        return next(new Error('unauthorized access'));
    }
};

//grant access to specific roles
//always put this after protect, bc request.user is set by protect
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`user role "${req.user.role}" is unauthorized to access this route`, 403));
        }
        next();
    };
};