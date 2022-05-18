import db from '../database/database.js';
import { ObjectId } from 'mongodb';

export async function CheckoutController(req, res) {

    try {

        const userId = ObjectId(res.locals.user._id)

        const cart = await db.collection("bootstore_carts").findOne({ user: userId });
        if (!cart) return res.status(404).send("Your cart wasn't found.");
        if (!(cart?.cartList.length > 0)) return res.status(404).send("No products in your cart.");

        cart.cartList.forEach(async e => await db.collection("bootstore_products").updateOne({ productID: ObjectId(e) }, {
                $set: { productStatus: 'unavailable' }
            })
        );
        await db.collection("bootstore_checkouts").insertOne({
            user: userId,
            timestamp: Date.now(),
            products: cart.cartList,
        });
        await db.collection("bootstore_carts").updateOne({ user: userId }, {
            $set: { cartList: [] }
        });

        res.sendStatus(200)

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}

export async function GetHistoryController(req, res) {

    try {

        const userId = res.locals.user._id

        const history = await db.collection("bootstore_checkouts").find({ user: userId }).toArray();
        
        const parseHistory = await Promise.all(history.map(async h => { return {...h, products: await Promise.all(
            h.products.map(
                async e => await db.collection("bootstore_products").findOne({ productID: ObjectId(e) })
            ))}
        }))

        return res.send(parseHistory);

    } catch (err) { console.log(err); return res.status(500).send("Error accessing database while loading user's cart."); }
}

export async function MyStoreController(req, res) {

    try {

        const userId = res.locals.user._id

        const products = await db.collection("bootstore_mystore").findOne({ user: userId });

        res.send(await Promise.all(
            products?.storeList.map(
                async e => await db.collection("bootstore_products").findOne({ productID: e })
            )
        ))

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}