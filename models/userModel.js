const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { parsePhoneNumberFromString } = require('libphonenumber-js');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A user must have a first name'],
        trim: true,
        index: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, 'A user must have a last name'],
        trim: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'A user must have email'],
        validate: [validator.isEmail, 'Please Provide valid email']
    },
    profileImage: String,
    userName: String,
    dob: {
        type: Date,
        required: [true, 'A user must have date of birth']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        lowercase: true,
        required: [true, 'A user must have gender']
    },
    mobileNo: {
        type: String,
        required: [true, 'A user must have mobile number']
    },
    countryCode: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide confirm password'],
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Password and Confirm password are not matched! "
        }
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true // Automatically adds createdAt and updatedAt fields
});


userSchema.pre('save', async function (next) {

    this.firstName = this.firstName.toLowerCase();
    this.lastName = this.lastName.toLowerCase();
    this.userName = this.firstName + " " + this.lastName;

    let cleanedMobileNo = this.mobileNo.replace(/\D/g, '');
    let phoneNumber = parsePhoneNumberFromString(this.mobileNo);

    if (!phoneNumber) {
        phoneNumber = parsePhoneNumberFromString(`+91${cleanedMobileNo}`);
    }

    if (!phoneNumber || !phoneNumber.isValid()) {
        return next(new Error('Invalid mobile number format'));
    }

    if (cleanedMobileNo.length > 15) {
        return next(new Error('Mobile number is too long'));
    }

    this.mobileNo = phoneNumber.nationalNumber.toString();
    this.countryCode = phoneNumber.countryCallingCode.toString();

    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});




userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.statics.extractMobileNumber = async function (mobileNumber) {
    return parsePhoneNumberFromString(mobileNumber)
}

userSchema.methods.changePassword = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changeTimestamp;
    }
    return false;
}


const User = mongoose.model('Users', userSchema);

module.exports = User;