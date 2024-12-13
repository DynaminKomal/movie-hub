const { grasp, handleError } = require("../utility/response-utility");
const Joi = require('joi')

const updateProfile = grasp(async (req, res, next) => {
    try {
        const schema = Joi.object({
            profileImage: Joi.string(),
            email: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            mobileNo: Joi.string(),
            countryCode: Joi.string(),
        })
        req.body = await schema.validateAsync(req.body);
        next();
    } catch (error) {
        handleError(res, error)
    }
})


const serachQuery = grasp(async (req, res, next) => {
    try {
        const querySchema = Joi.object({
            query: Joi.string().required()
        })
        req.query = await querySchema.validateAsync(req.query);
        next();
    } catch (error) {
        handleError(res, error)
    }
})


module.exports = {
    updateProfile,
    serachQuery
}