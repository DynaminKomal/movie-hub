const { grasp, handleError } = require("../utility/response-utility");
const Joi = require('joi')

const login = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            emailorMobile: Joi.string().required(),
            password: Joi.string().required(),
        })
        req.body = await schema.validateAsync(req.body)
        next();

    } catch (error) {
        handleError(res, error)
    }
})


const signup = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().required(),
            dob: Joi.date().required(),
            gender: Joi.string().required(),
            mobileNo: Joi.string().required(),
            userType: Joi.string(),
            password: Joi.string().required(),
            passwordConfirm: Joi.string().required(),

        })
        req.body = await schema.validateAsync(req.body)
        next();

    } catch (error) {
        handleError(res, error)
    }
})

const forgetPassword = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            emailorMobile: Joi.string().required(),
        })
        req.body = await schema.validateAsync(req.body)
        next();

    } catch (error) {
        handleError(res, error)
    }
})

const resetPassword = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            emailorMobile: Joi.string().required(),
            password: Joi.string().required(),
            passwordConfirm: Joi.string().required(),
        })
        req.body = await schema.validateAsync(req.body)
        next();

    } catch (error) {
        handleError(res, error)
    }
})

const verifyResetToken = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            emailorMobile: Joi.string().required(),
            resetToken: Joi.string().required(),
        })
        req.body = await schema.validateAsync(req.body)
        next();

    } catch (error) {
        handleError(res, error)
    }
})

module.exports = {
    login,
    signup,
    forgetPassword,
    resetPassword,
    verifyResetToken
}