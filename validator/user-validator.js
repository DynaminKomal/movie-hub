const { grasp, handleError } = require("../utility/response-utility");
const Joi = require('joi')

exports.updateProfile = grasp(async (req, res, next) => {
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
    }catch(error){
        handleError(res, error)
    }
})