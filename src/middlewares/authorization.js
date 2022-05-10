import { LoginSchema, RegisterSchema } from '../schemas/authorization.js';

export function LoginMiddleware(req, res, next) {

    const { error } = LoginSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}

export function RegisterMiddleware(req, res, next) {

    const { error } = RegisterSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}