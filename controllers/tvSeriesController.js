const TvSeries = require("../models/tvseriesModel")
const { grasp, handleError, sendResponse } = require("../utility/response-utility");
const factory = require("./handleFactory")

exports.createTvSeries = grasp(async (req, res) => {
    try {
        const newTvSeriesData = await TvSeries.create(req.body);
        sendResponse(res, 201, "success", "A new Tv serires added successfully!", newTvSeriesData)

    } catch (error) {
        handleError(res, error);
    }
})

exports.updateTvSeriesSeaons = grasp(async (req, res) => {
    try {
        const { id } = req.params;
        const { season_id, episode_id } = req.query;
        const seasonEpisodeData = req.body;
        // Find the TV series by ID
        const tvSeries = await TvSeries.findById(id);
        if (!tvSeries) {
            return sendResponse(res, 404, "fail", "TV series not found!");
        }

        if (!season_id && !episode_id) {
            if (seasonEpisodeData.seasonNumber) {
                return sendResponse(res, 400, "fail", "You cannot manually set a season number.");
            }
            const isEpisodeNumberExit = seasonEpisodeData.episodes && seasonEpisodeData.episodes.some(item => item.hasOwnProperty('episodeNumber'));
            if (isEpisodeNumberExit) {
                return sendResponse(res, 400, "fail", "You cannot manually set a episode number.");
            }
            if (seasonEpisodeData.episodes) {
                tvSeries.seasons.push(seasonEpisodeData);
                await tvSeries.save();
                return sendResponse(res, 200, "success", "New seasons added successfully.");
            }

        }

        if (season_id) {
            const season = tvSeries.seasons.id(season_id);
            if (!season) {
                return sendResponse(res, 404, "fail", "Season not found");
            }
            if (!Array.isArray(seasonEpisodeData)) {
                return sendResponse(res, 400, "Fail", "Invalid request, missing parameters.");
            }
            const isEpisodeNumberExit = seasonEpisodeData.some(item => item.hasOwnProperty('episodeNumber'));
            if (isEpisodeNumberExit) {
                return sendResponse(res, 400, "fail", "You cannot manually set a episode number.");
            }

            // Add new episodes if season exists
            if (seasonEpisodeData && Array.isArray(seasonEpisodeData) && seasonEpisodeData.length > 0) {
                seasonEpisodeData.forEach(episodeData => {
                    const newEpisode = {
                        ...episodeData,
                        episodeNumber: season.episodes.length + 1,
                    };
                    season.episodes.push(newEpisode);
                });
                await tvSeries.save();
                return sendResponse(res, 200, "success", "New episodes added successfully.");
            }
        }
        if (season_id && episode_id) {
            const season = tvSeries.seasons.id(season_id);
            if (!season) {
                return sendResponse(res, 404, "fail", "Season not found");
            }
            const episode = season.episodes.id(episode_id);
            if (!episode) {
                return sendResponse(res, 404, "fail", "Episode not found");
            }
            if (req.body.episodeNumber) {
                return sendResponse(res, 400, "fail", "You cannot manually set a episode number.");
            }
            episode.title = req.body.title || episode.title;
            episode.description = req.body.description || episode.description;
            episode.broadcastDate = req.body.broadcastDate || episode.broadcastDate;
            episode.imageLink = req.body.imageLink || episode.imageLink;
            episode.videoLink = req.body.videoLink || episode.videoLink;
            await tvSeries.save()
            return sendResponse(res, 200, "success", "Episode updated successfully.");
        }

        return sendResponse(res, 400, "Fail", "Invalid request, missing parameters.");
    } catch (error) {
        handleError(res, error);
    }
});


exports.updateTvSeries = grasp(async (req, res) => {
    try {

        const { id } = req.params;
        if (req.body.seasons || req.body.episodes) {
            return sendResponse(res, 400, "Fail", "Invalid parameters.");
        }

        const updatedData = await TvSeries.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!updatedData) {
            return sendResponse(res, 404, "fail", "This series is unavailable or no longer exists.")
        }
        return sendResponse(res, 200, "success", "Tv series updated successfully.")

    } catch (error) {
        handleError(res, error)
    }
})



exports.deleteTvSeries = grasp(async (req, res) => {
    try {
        const { id } = req.params;
        const { season_id, episode_id } = req.query;
        if (id && !season_id && !episode_id) {
            const deletedDoc = await TvSeries.findByIdAndDelete(id)
            if (!deletedDoc) {
                return sendResponse(res, 404, "fail", `This series is unavailable or no longer exists.`)
            }
            return sendResponse(res, 200, "success", `${deletedDoc.fullName} deleted successfully.`)
        }
        if (id && season_id && !episode_id) {
            const tvSeries = await TvSeries.findById(id);
            if (!tvSeries) {
                return sendResponse(res, 404, "fail", "TV series not found!");
            }
            const seasonIndex = tvSeries.seasons.findIndex(season => season._id.toString() === season_id);
            if (seasonIndex === -1) {
                return sendResponse(res, 404, "fail", "Season not found!");
            }
            const seasonNumber = tvSeries.seasons[seasonIndex].seasonNumber;
            tvSeries.seasons.splice(seasonIndex, 1);
            await tvSeries.save();

            return sendResponse(res, 200, "success", `Season ${seasonNumber} deleted successfully from ${tvSeries.fullName}.`);
        }

        if (id && season_id && episode_id) {
            const tvSeries = await TvSeries.findById(id);
            if (!tvSeries) {
                return sendResponse(res, 404, "fail", "TV series not found!");
            }
            const season = tvSeries.seasons.id(season_id);
            if (!season) {
                return sendResponse(res, 404, "fail", "Season not found");
            }
            const episodeIndex = season.episodes.findIndex(episode => episode._id.toString() === episode_id);
            if (episodeIndex === -1) {
                return sendResponse(res, 404, "fail", "Episode not found!");
            }
            const episodeNumber = season.episodes[episodeIndex].episodeNumber;
            season.episodes.splice(episodeIndex, 1);

            await tvSeries.save();

            return sendResponse(res, 200, "success", `Episode ${episodeNumber} deleted successfully from Season ${season.seasonNumber} of ${tvSeries.fullName}.`);
        }
        return sendResponse(res, 400, "Fail", "Invalid request, missing parameters.");

    } catch (error) {
        handleError(res, error)
    }
})



exports.getAllTvSeries = factory.getAllData(TvSeries)