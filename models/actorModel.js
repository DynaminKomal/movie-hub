const mongoose = require('mongoose');;

const actorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'An actor must have a name'],
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    profileImage: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: [true, "An actor must have a date of birth"]
    },
    nationality: {
        type: String,
        required: [true, "An actor must have a nationality"]
    }
}, { timestamps: true });


const Actor = mongoose.model('Actor', actorSchema)

module.exports = Actor