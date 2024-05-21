const Joi = require('joi');

exports.addProductValidation = {
    body : Joi.object()
    .required()
    .keys({
        name:Joi.string().min(5).max(100).required().messages({
            "string.empty":"you must enter a valid name",
            "any.required":"you must enter a name"
        }),
        description: Joi.string().min(10).max(1000).required(),
        photo:Joi.string().required(),
        price:Joi.number().required()
    })
}