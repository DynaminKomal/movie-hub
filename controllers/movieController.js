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