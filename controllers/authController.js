const User = require('../models/userModel')
const { grasp, sendResponse, handleError } = require('../utility/response-utility');
const jwt = require('jsonwebtoken')

// Generate JWT token
const getToken = (id) => {
    return jwt.sign(
        { id: id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Set JWT token in cookies
const setCookies = (token, res) => {
    const cookiesOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        cookiesOptions.secure = true;
    }

    res.cookie('jwt', token, cookiesOptions);
};

exports.signup = grasp(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = getToken(newUser._id);
        setCookies(token, res);
        sendResponse(res, 201, "success", "A new user created successfully!");
    } catch (error) {
        handleError(res, error);
    }
})