const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const { grasp, sendResponse } = require("./response-utility");
const User = require("../models/userModel");
const hasPermission = require("../rules");

exports.tokenVerify = grasp(async (req, res, next) => {
    let token;
    const url = `${req.method} ${req.baseUrl}${req.path}`;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } 

    if (!token) {
        return sendResponse(res, 401, "fail", "You have no token. Please try again to login!");
    }

    try {
        const decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const userExist = await User.findById(decodeToken.id);
        if (!userExist) {
            return sendResponse(res, 401, "fail", "User does not exist.");
        }

        const isPasswordChange = await userExist.changePassword(decodeToken.iat);
        if (isPasswordChange) {
            return sendResponse(res, 401, "fail", "User recently changed password! Please log in again.");
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = userExist;

        const checkAccess = hasPermission(url, userExist.userType)
        if (checkAccess.allowed) {
            next();
        } else {
            if (checkAccess.message === "Invalid path") {
                return sendResponse(res, 401, "fail", "Invalid path.")
                    ;

            } else if (checkAccess.message === "Access denied") {
                return sendResponse(res, 403, "fail", "Access denied.");
            }
        }
    } catch (error) {
        console.error("Error in tokenVerify middleware:", error);
        return sendResponse(res, 401, "fail", "Invalid token or token expired.");
    }
});
