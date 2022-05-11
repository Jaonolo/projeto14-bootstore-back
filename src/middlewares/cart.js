import { AddCartSchema } from "../schemas/cart.js"

export function AddCartMiddleware(req, res, next) {

    const { error } = AddCartSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}