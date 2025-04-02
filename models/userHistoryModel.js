const mongoose = require('mongoose');
const crypto = require('crypto')


const userHistorySchema = new mongoose.Schema({
    userEmailorMobile: String,
    passwordResetToken: String,
    passwordResetExpire: Date,
})

userHistorySchema.methods.createPasswordResetToken = async function () {
    const validationCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.passwordResetToken = validationCode;

    const localTime = new Date();  
    localTime.setMinutes(localTime.getMinutes() + 30);
    this.passwordResetExpire = localTime; 
    return validationCode;
};


const UserHistory = mongoose.model('User-History', userHistorySchema);

module.exports = UserHistory;