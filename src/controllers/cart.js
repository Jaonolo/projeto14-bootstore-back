import db from '../database/database.js';
import { ObjectId } from 'mongodb';

export async function ListCartController(req, res) {

    try {

        const userId = res.locals.user._id

        const cart = await db.collection("bootstore_carts").findOne({ user: ObjectId(userId) });
        console.log(cart)

        return cart ? res.send(await Promise.all(
            cart?.cartList.map(
                async e => await db.collection("bootstore_products").findOne({ productID: ObjectId(e) })
            )
        )) : res.send([])

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
            await db.collection("bootstore_carts").updateOne({ user: userId }, {
                $set: { cartList: [...cart.cartList, req.body.product] }
            });
        }

        await db.collection("bootstore_products").updateOne({ productID: ObjectId(req.body.product) }, {
            $set: { productStatus: 'in cart' }
        })

        return res.sendStatus(200);

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}