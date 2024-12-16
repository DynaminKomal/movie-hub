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

const signup = grasp(async (req, res) => {
    try {
        await User.create(req.body);
        sendResponse(res, 201, "success", "A new user created successfully!");
    } catch (error) {
        handleError(res, error);
    }
})


const login = grasp(async (req, res) => {
    const { emailorMobile, password } = req.body;

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


const forgetPassword = grasp(async (req, res) => {
    const { emailorMobile } = req.body;
    const requestTimestamp = new Date();

    const year = requestTimestamp.getUTCFullYear();
    const month = String(requestTimestamp.getUTCMonth() + 1).padStart(2, '0');
    const day = String(requestTimestamp.getUTCDate()).padStart(2, '0');
    const hours = String(requestTimestamp.getUTCHours()).padStart(2, '0');
    const minutes = String(requestTimestamp.getUTCMinutes()).padStart(2, '0');

    const formattedTimestamp = `${year}/${month}/${day} ${hours}:${minutes} GMT`;

    try {
        const isPhoneNumber = /^[0-9+]+$/.test(emailorMobile);
        let user;
        if (isPhoneNumber) {
            const extractedPhoneNo = await User.extractMobileNumber(emailorMobile);
            const { countryCallingCode, nationalNumber } = extractedPhoneNo;

            user = await User.findOne({ mobileNo: nationalNumber, countryCode: countryCallingCode });

        } else {
            user = await User.findOne({ email: emailorMobile });
        }
        if (!user) {
            return sendResponse(res, 401, "fail", "User does not exist.");
        }
        const userHistory = new UserHistory({ userEmailorMobile: emailorMobile });
        const resetToken = await userHistory.createPasswordResetToken();
        await userHistory.save();
        const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;
        const message = `<h4>Reset Password</h4>
                        <p>A password reset event has been triggered. The password reset window is limited to 10 minutes.</p>
                        <p>If you do not reset your password within 10 minutes, you will need to submit a new request.</p>
                        <p> To complete the password reset process, visit the following link:</p>
                        <p><a href="${resetUrl}">${resetUrl}</a></p>
                        <p>Username <a href="mailto:${user.userName}">${user.userName}</a></p>
                        <p>Request Timestamp ${formattedTimestamp}</p>`;

        try {
            await sendEmail({
                userEmail: user.email,
                subject: 'Password Reset',
                message,
                isHtml: true
            }, res);
            return sendResponse(res, 200, "success", "Token sent to email");
        } catch (err) {
            userHistory.passwordResetToken = undefined;
            userHistory.passwordResetExpire = undefined;
            await userHistory.save({ validateBeforeSave: false });
        }
    } catch (error) {
        handleError(res, error);
    }
});

const resetPassword = grasp(async (req, res) => {
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
            const extractedPhoneNo = await User.extractMobileNumber(user.userEmailorMobile)
            const { countryCallingCode, nationalNumber } = extractedPhoneNo;

            userExist = await User.findOne({ mobileNo: nationalNumber, countryCode: countryCallingCode });

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
            data: userExist
        }
        sendResponse(res, 200, "success", "You logged in successfully!", userData);

    } catch (err) {
        console.log("err", err)
        handleError(res, err);
    }
})


module.exports = {
    login,
    signup,
    forgetPassword,
    resetPassword
}