import joi from 'joi';

export const LoginSchema = joi.object({

    email: joi.string().email().required(),
    password: joi.string().required()

});

export const RegisterSchema = joi.object({

    name: joi.string().min(4).max(10).alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    repeat_password: joi.ref('password')

});