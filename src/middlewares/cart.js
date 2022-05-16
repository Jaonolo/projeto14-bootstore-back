import { AddCartSchema } from "../schemas/cart.js"

export async function AddCartMiddleware(req, res, next) {

    const { error } = AddCartSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    const product = await db.collection("bootstore_products").findOne({ productID: req.body.product });
    if (!product) return res.status(404).send('Product not found.');
    if (product.productStatus !== 'available') return res.status(404).send('Product not found.');

    next();
}