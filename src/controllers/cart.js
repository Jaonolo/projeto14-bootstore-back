import db from '../database/database.js';

export async function ListCartController(req, res) {

    try {

        const userId = res.locals.user._id

        const cart = await db.collection("bootstore_carts").findOne({ user: userId });

        return cart ? res.send(cart.cartList) : res.send([])

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}

export async function AddCartController(req, res) {

    try {

        const userId = res.locals.user._id

        const cart = await db.collection("bootstore_carts").findOne({ user: userId });

        if (!cart) await db.collection("bootstore_carts").insertOne({
            user: userId,
            cartList: [req.body.product]
        });
        else {
            await db.collection("bootstore_products").updateOne({ productID: req.body.product }, {
                $set: { productStatus: 'in cart' }
            })
            await db.collection("bootstore_carts").updateOne({ user: userId }, {
                $set: { cartList: [...cart.cartList, req.body.product] }
            });
        }

        return res.sendStatus(200);

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}