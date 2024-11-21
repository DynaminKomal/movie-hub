const Movies = require("../models/movieModel");
const { grasp, handleError, sendResponse } = require("../utility/response-utility");

exports.createMovie = grasp(async (req, res) => {
    try {
        const newMovieData = await Movies.create(req.body)
        sendResponse(res, 201, "success", "A new user created successfully!", newMovieData)
    } catch (error) {
        handleError(res, error)
    }
})


exports.getAllMovies = grasp(async (req, res) => {
    try {
        const getAllMoviesData = await Movies.find();
        sendResponse(res, 201, "success", "Data fetch successfully!", getAllMoviesData)

    } catch (error) {
        handleError(res, error)
    }
})

exports.getBannerMovies = grasp(async (req, res) => {
    try {
        const getBannerMoviesData = await Movies.find().limit(3);
        sendResponse(res, 201, "success", "Data fetch successfully!", getBannerMoviesData)

    } catch (error) {
        handleError(res, error)
    }
})

exports.getTrendingMovie = grasp(async (req, res) => {
    try {
        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));
        const getTrendingMovie = await Movies.aggregate([
            {
                $match: {
                    releaseDate: {
                        $gte: thirtyDaysAgo,
                    },
                    rating: {
                        $gte: 7
                    }
                }
            },
            {
                $sort: {
                    releaseDate: -1
                }
            }
        ]);
        sendResponse(res, 201, "success", "Data fetch successfully!", getTrendingMovie)

    } catch (error) {
        console.log("error", error)
        handleError(res, error)
    }
})