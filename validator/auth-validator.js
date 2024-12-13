const { grasp, handleError } = require("../utility/response-utility");
const Joi = require('joi')

exports.login = grasp(async (req, res, next) => {
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