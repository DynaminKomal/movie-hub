const mongoose = require('mongoose')

const userSearchHistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    serchQuery: String,
    find: Boolean,
    timestamps: true
});


const UserSearchHistory = mongoose.model('serach-history', userSearchHistorySchema);


module.exports = UserSearchHistory
