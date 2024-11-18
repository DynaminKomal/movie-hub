const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'A movie must have a name'],
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
        required: [true, 'A movie must have a description'],
    },
    summary: {
        type: String,
        required: [true, 'A movie must have a summary'],
    },
    imageLink: {
        type: String,
        required: [true, 'A movie must have an imageLink'],
    },
    videoLink: {
        type: String,
        required: [true, 'A movie must have a videoLink'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'A movie must have a release date'],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    duration: {
        type: String,
        required: [true, 'A movie must have a duration'],
    },
    genres: {
        type: [String],
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    deletedAt: {
        type: Date,
    }
}, { timestamps: true });

movieSchema.pre('save', async function (next) {

    if (!this.originalName) {
        this.originalName = this.fullName;
    }
    next();
});


const Movies = mongoose.model('Movies', movieSchema);

module.exports = Movies;
