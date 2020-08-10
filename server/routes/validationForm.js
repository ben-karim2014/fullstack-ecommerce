const joi = require('@hapi/joi')

//Register validation
const registerValidation = (data) =>{
    const validationSchema = joi.object().keys({
        firstName: joi.string().min(6).required(),
        lastName: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
        address: joi.string().min(6).required()

    });
    return validationSchema.validate(data)
}

//Register validation
const loginValidation = (data) =>{
    const validationSchema = joi.object().keys({
        
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
       
    });
    return validationSchema.validate(data)
}
module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;