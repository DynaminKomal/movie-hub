const Movies = require("../models/movieModel");
const UpcomingMovies = require("../models/upcomingMovie");
const { grasp, handleError, sendResponse } = require("../utility/response-utility");
const factory = require('./handleFactory')

const createMovie = grasp(async (req, res) => {
    try {
        const currentDate = new Date();
        const releaseDate = new Date(req.body.releaseDate);
        const checkRelaseDate = currentDate < releaseDate;
        let newMovieData;
        if (checkRelaseDate) {
            newMovieData = await UpcomingMovies.create(req.body)
        } else {
            newMovieData = await Movies.create(req.body)
        }
        sendResponse(res, 201, "success", "A new user created successfully!", newMovieData)
    } catch (error) {
        handleError(res, error)
    }
})


const getAllMovies = factory.getAllData(Movies)

const getBannerMovies = factory.getAllData(Movies, 4)

const getTrendingMovie = grasp(async (req, res) => {
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
        ]).limit(8);
        sendResponse(res, 201, "success", "Data fetch successfully!", getTrendingMovie)

    } catch (error) {
        handleError(res, error)
    }
})


const getUpcomingMovie = factory.getAllData(UpcomingMovies)


module.exports = {
    createMovie,
    getAllMovies,
    getBannerMovies,
    getTrendingMovie,
    getUpcomingMovie
}