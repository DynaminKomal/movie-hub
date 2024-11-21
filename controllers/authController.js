const User = require('../models/userModel')
const { grasp, sendResponse, handleError } = require('../utility/response-utility');
const jwt = require('jsonwebtoken')

// Generate JWT token
const getToken = (id, userType) => {
    return jwt.sign(
        {
            id: id,
            userType: userType
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

exports.signup = grasp(async (req, res) => {
    try {
        await User.create(req.body);
        sendResponse(res, 201, "success", "A new user created successfully!");
    } catch (error) {
        handleError(res, error);
    }
})


exports.login = grasp(async (req, res) => {
    const { emailorMobile, password } = req.body;
    if (!emailorMobile || !password) {
        return sendResponse(res, 400, "fail", "Please provide email and password!");
    }

    try {
        const isPhoneNumber = /^[0-9+]+$/.test(emailorMobile);
        let user;
        if (isPhoneNumber) {
            const extractedPhoneNo = await User.extractMobileNumber(emailorMobile)
            const { countryCallingCode, nationalNumber } = extractedPhoneNo;

            user = await User.findOne({ mobileNo: nationalNumber, countryCode: countryCallingCode });

        } else {
            user = await User.findOne({ email: emailorMobile });
        }
        if (!user) {
            return sendResponse(res, 401, "fail", "User does not exist.");
        }
        const checkPassword = await user.correctPassword(password, user.password);
        if (!checkPassword) {
            return sendResponse(res, 401, "fail", "Please provide the correct password!");
        }

        const token = getToken(user._id, user.userType);
        const userData = {
            token: token,
            data: user
        }
        sendResponse(res, 200, "success", "You logged in successfully!", userData);
    } catch (error) {
        handleError(res, error);
    }
});
