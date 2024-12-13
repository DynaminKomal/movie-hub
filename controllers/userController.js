const User = require('../models/userModel')
const { grasp, handleError, sendResponse } = require("../utility/response-utility");
const cloudinary = require("cloudinary").v2

exports.updateUserProfile = grasp(async (req, res) => {
    try {
        const { id, firstName, lastName } = req.user;
        if (req.files) {
            const file = req.files.profileImage;
            const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "User",
                public_id: file.name.replace(/\.(jpg|jpeg|png)$/, ""),
            });

            if (!uploadResult.url) {
                return sendResponse(res, 400, "fail", "Profile image is not uploaded. Please try again.");
            }
            req.body.profileImage = uploadResult.url;
        }

        const updateUserData = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updateUserData) {
            return sendResponse(res, 404, "fail", `${firstName} ${lastName} data not found`);
        }

        sendResponse(res, 200, "success", `${firstName} ${lastName} data updated successfully.`);
    } catch (error) {
        handleError(res, error);
    }
});