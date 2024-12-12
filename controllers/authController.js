const User = require('../models/userModel')
const { grasp, sendResponse, handleError } = require('../utility/response-utility');
const jwt = require('jsonwebtoken');
const UserHistory = require("../models/userHistoryModel");
const sendEmail = require('../utility/email');
const crypto = require('crypto')

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


exports.checkExits = (req, res, next) => {
    if (Object.keys(req.body).length > 1) {
        return sendResponse(res, 400, "fail", "Only emailorMobile field is allowed")
    }
    next()
}

exports.forgetPassWord = grasp(async (req, res) => {

    const { emailorMobile } = req.body;
    if (!emailorMobile) {
        return sendResponse(res, 400, "fail", "Email or mobile number is required.")
    }
    try {
        const isPhoneNumber = /^[0-9+]+$/.test(emailorMobile);
        let user;
        if (isPhoneNumber) {
            user = await User.findOne({ mobileNo: emailorMobile })
        }
        else {
            user = await User.findOne({ email: emailorMobile });
        }
        if (!user) {
            return sendResponse(res, 401, "fail", "User does not exist.");
        }
        const userHistory = new UserHistory({ userEmailorMobile: emailorMobile });
        const resetToken = await userHistory.createPasswordResetToken();
        await userHistory.save();
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`
        const message = `Forget Your Password? Submit a PATCH request with new password and passwordConfirm to: ${resetUrl}\n
        If you didn't forget your passwors, please ignore this email.`
        try {
            await sendEmail({
                userEmail: user.email,
                subject: 'Your password reset token (valid for 10 min)',
                message
            }, res)
            sendResponse(res, 200, "success", "Token sent to email")
        } catch (err) {
            userHistory.passwordResetToken = undefined
            userHistory.passwordResetExpire = undefined
            const error = {
                statusCode: 500,
                message: 'There was an error sending the email. Try again later!'
            }
            await userHistory.save({ validateBeforeSave: false });
            handleError(res, error);
        }
    } catch (error) {
        handleError(res, error)
    }
})


exports.resetPassword = grasp(async (req, res) => {
    try {
        const { password, passwordConfirm } = req.body;
        //Get user based token
        const hashedToken = crypto.createHash('sha256')
            .update(req.params.token).digest('hex');
        //check token exist and token not expired
        const user = await UserHistory.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpire: { $gt: Date.now() }
        })
        if (!user) {
            return sendResponse(res, 400, "fail", "Invalid Token or has expired.")
        }
        let userExist;
        const isPhoneNumber = /^[0-9+]+$/.test(user.userEmailorMobile);
        if (isPhoneNumber) {
            userExist = await User.findOne({ mobileNo: user.userEmailorMobile })
        }
        else {
            userExist = await User.findOne({ email: user.userEmailorMobile });
        }
        if (!userExist) {
            return sendResponse(res, 401, "fail", "User does not exist.");
        }
        // set new password
        userExist.password = password;
        userExist.passwordConfirm = passwordConfirm;
        await userExist.save()


        const token = getToken(userExist._id, userExist.userType)
        const userData = {
            token: token,
            data: user
        }
        sendResponse(res, 200, "success", "You logged in successfully!", userData);

    } catch (err) {
        console.log("err", err)
        handleError(res, err);
    }
})