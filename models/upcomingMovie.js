const mongoose = require('mongoose');

const upcomingMovieSchema = new mongoose.Schema({
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
    imageLink: {
        type: String,
        required: [true, 'A movie must have an imageLink'],
    },
    trailerLink: {
        type: String,
        required: [true, 'A movie must have a videoLink'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'A movie must have a release date'],
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


upcomingMovieSchema.pre('save', async function (next) {

    if (!this.originalName) {
        this.originalName = this.fullName;
    }
    next();
});


const UpcomingMovies = mongoose.model('Upcoming-Movies', upcomingMovieSchema);

module.exports = UpcomingMovies;
