const Joi = require('joi');

exports.signUpValidation = {
    body : Joi.object()
    .required()
    .keys({
        name:Joi.string().required().messages({
            "string.empty":"you must enter a valid name",
            "any.required":"you must enter a name"
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Password and Confirm Password must match',
            'any.required': 'Confirm Password is required'
        }),
        phone:Joi.number(),
    })
}

exports.signInValidation = {
    body : Joi.object()
    .required()
    .keys({
      
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    })
}

exports.updateUserValidation = {
    body : Joi.object()
    .required()
    .keys({
        name:Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
        phone:Joi.number(),
        role :Joi.string()

    }),
    params: Joi.object()
    .required()
    .keys({
        id:Joi.string().min(24).max(24).required()
    })
}



