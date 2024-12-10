const TvSeries = require("../models/tvseriesModel")
const { grasp, handleError, sendResponse } = require("../utility/response-utility");

exports.createTvSeries = grasp(async (req, res) => {
    try {
        const newTvSeriesData = await TvSeries.create(req.body);
        sendResponse(res, 201, "success", "A new Tv serires added successfully!", newTvSeriesData)

    } catch (error) {
        handleError(res, error);
    }
})