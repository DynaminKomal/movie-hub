const User = require('../models/userModel')
const { grasp, handleError, sendResponse } = require("../utility/response-utility");
const cloudinary = require("cloudinary").v2;
const Movies = require("../models/movieModel");
const TvSeries = require("../models/tvseriesModel");
const UserSearchHistory = require("../models/userSearchHistory");

const updateUserProfile = grasp(async (req, res) => {
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


const serachQuery = grasp(async (req, res) => {
    try {
        const { id } = req.user;
        const { query } = req.query;
        const user = await User.findById(id)
        if (!user) {
            return sendResponse(res, 400, "fail", "User does not exists.")
        }
        let getAllData = []
        if (query) {
            const movieData = await Movies.find({
                fullName: {
                    $regex: query, $options: 'i'
                }
            })
            const tvSeriesData = await TvSeries.find({
                fullName: {
                    $regex: query, $options: 'i'
                }
            })
            getAllData = [...movieData, ...tvSeriesData];
        }
        let userSerachHistoryData = {
            userId: id,
            serchQuery: query,
            found: false
        }
        if (getAllData.length === 0) {

            await UserSearchHistory.create(userSerachHistoryData)
            return sendResponse(res, 404, "fail", "Data not found.");
        } else {
            userSerachHistoryData.found = true;
            await UserSearchHistory.create(userSerachHistoryData)
            return sendResponse(res, 200, "success", "Data successfully fetch.", getAllData);
        }



    } catch (error) {
        handleError(res, error);
    }
})


module.exports = {
    updateUserProfile,
    serachQuery
}