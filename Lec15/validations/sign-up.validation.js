const Joi = require("joi");


exports.signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    age: Joi.number().min(12).max(99).required(),
    isSmoker: Joi.boolean().optional().default(false),
    name: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

