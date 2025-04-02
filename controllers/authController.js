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
        const message = `<h4>Password Reset Validation</h4>
                        <p>A password reset event has been triggered. The validation code is valid for 10 minutes.</p>
                        <p>If you do not use the code within 10 minutes, you will need to submit a new request.</p>
                        <p>Validation Code: <strong>${resetToken}</strong></p>
                        <p>Username: <a href="mailto:${user.userName}">${user.userName}</a></p>
                        <p>Request Timestamp: ${formattedTimestamp}</p>`;

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

const verifyResetToken = grasp(async (req, res) => {
    const { emailorMobile, resetToken } = req.body;

    try {
        const userHistory = await UserHistory.find({ userEmailorMobile: emailorMobile })
            .sort({ "passwordResetExpire": -1 })
            .limit(1)
            .exec();

        if (!userHistory || userHistory.length === 0) {
            return sendResponse(res, 404, "fail", "No reset request found.");
        }

        const latestUserHistory = userHistory[0];

        if (latestUserHistory.passwordResetToken !== resetToken) {
            return sendResponse(res, 401, "fail", "Invalid reset token.");
        }

        const currentTime = new Date();
        const currentTimeInUTC = new Date(currentTime.toISOString());

        if (currentTimeInUTC > latestUserHistory.passwordResetExpire) {
            return sendResponse(res, 401, "fail", "Verification Code has expired.");
        }

        return sendResponse(res, 200, "success", "Code is valid. You can now reset your password.");
    } catch (error) {
        handleError(res, error);
    }
});



const resetPassword = grasp(async (req, res) => {
    const { emailorMobile, newPassword, confirmPassword } = req.body;

    try {
        if (newPassword !== confirmPassword) {
            return sendResponse(res, 400, "fail", "Passwords do not match.");
        }
        const userHistory = await UserHistory.find({ userEmailorMobile: emailorMobile })
            .sort({ "passwordResetExpire": -1 })
            .limit(1)
            .exec();

        if (!userHistory) {
            return sendResponse(res, 404, "fail", "No reset request found.");
        }
        const latestUserHistory = userHistory[0];
        const currentTime = new Date();
        const currentTimeInUTC = new Date(currentTime.toISOString());

        if (currentTimeInUTC > latestUserHistory.passwordResetExpire) {
            return sendResponse(res, 401, "fail", "Verification Code has expired.");
        }
        const user = await User.findOne({ email: emailorMobile }) || await User.findOne({ mobileNo: emailorMobile });

        if (!user) {
            return sendResponse(res, 404, "fail", "User not found.");
        }

        user.password = newPassword;
        user.passwordConfirm = confirmPassword;
        await user.save();

        return sendResponse(res, 200, "success", "Password has been successfully updated.");
    } catch (error) {
        console.log("error", error)
        handleError(res, error);
    }
});



module.exports = {
    login,
    signup,
    forgetPassword,
    resetPassword,
    verifyResetToken
}