const mongoose = require('mongoose');

// Season Schema
const seasonSchema = mongoose.Schema({
    seasonNumber: { type: Number, required: true },
    episodes: [{
        episodeNumber: { type: Number, required: true },
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
    seasons: {
        type: [seasonSchema],
        required: [true, 'A series must have at least one season']
    },
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
    next();
})


const TvSeries = mongoose.model('TV-Series', tvseriesSchema);


module.exports = TvSeries;
