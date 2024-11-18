const User = require('../models/userModel')
const { grasp, sendResponse, handleError } = require('../utility/response-utility');

exports.signup = grasp(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        sendResponse(res, 201, "success", "A new user created successfully!", newUser);
    } catch (error) {
        handleError(res, error);
    }
})