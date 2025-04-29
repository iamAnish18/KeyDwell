const joi = require("joi");

module.exports.newHomeSchema = Joi.object({
    newhome : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        price : Joi.number().required().min(0),
        email_id : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        image: Joi.string().allow("" ,null)
    }).required()
})
