const Joi = require('joi');

module.exports.keydataSchema = Joi.object({
    keydata : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.string().allow("" , null),
        price : Joi.number().required().min(0),
        email_id : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required()
    }).required()
});
