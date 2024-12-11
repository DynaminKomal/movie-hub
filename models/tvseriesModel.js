const mongoose = require('mongoose');

// Season Schema
const seasonSchema = mongoose.Schema({
    seasonNumber: { type: Number, immutable: true },
    episodes: [{
        episodeNumber: { type: Number, immutable: true },
        title: { type: String, required: true },
        description: { type: String },
        broadcastDate: { type: Date },
        imageLink: {
            type: String,
            required: [true, 'A movie must have an image link'],
        },
        videoLink: {
            type: String,
            required: [true, 'A movie must have a video link'],
        }
    }]
});

// TvSeries Schema
const tvseriesSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'A series must have a name'],
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    originalName: {
        type: String,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'A series must have a description']
    },
    image: {
        type: String,
        required: [true, 'A series must have an image']
    },
    seasons: [seasonSchema],
    genres: {
        type: [String]
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    deletedAt: { type: Date }
}, { timestamps: true });


tvseriesSchema.pre('save', async function (next) {

    if (!this.originalName) {
        this.originalName = this.fullName;
    }
    for (let i = 0; i < this.seasons.length; i++) {
        const season = this.seasons[i];
        if (!season.seasonNumber) {
            season.seasonNumber = i + 1
        }

        for (let j = 0; j < season.episodes.length; j++) {
            const episode = season.episodes[j];
            if (!episode.episodeNumber) {
                episode.episodeNumber = j + 1;
            }
        }
    }

    next();
});



tvseriesSchema.methods.validateSeasonAndEpisodes = async function (newSeasons, season) {
    let isValid = true, lastSeasonNumber = 0;

    for (let season of newSeasons) {
        if (season.seasonNumber !== lastSeasonNumber + 1) {
            isValid = false;
            break;
        }
        lastSeasonNumber = season.seasonNumber;
        let lasEpisodeNumber = 0;
        for (let episode of season.episodes) {
            if (episode.episodeNumber !== lasEpisodeNumber + 1) {
                isValid = false;
                break;
            }
            lasEpisodeNumber = episode.episodeNumber;
        }
        if (!isValid) break;
    }

    return isValid;

}

const TvSeries = mongoose.model('TV-Series', tvseriesSchema);


module.exports = TvSeries;
