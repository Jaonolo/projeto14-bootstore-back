import db from '../database/database.js';

export async function CheckoutController(req, res) {

    try {

        const userId = res.locals.user._id
        let productsData = []
        let totalPrice = 0

        const cart = await db.collection("bootstore_carts").findOne({ user: userId });
        if (!cart) return res.status(404).send("Your cart wasn't found.");
        if (cart?.cartList.length > 0) return res.status(404).send("No products in your cart.");

        cart.cartList.forEach(async e => {
            const product =  await db.collection("bootstore_products").updateOne({ productID: e }, {
                $set: { productStatus: 'unavailable' }
            })
            productsData = [...productsData, product]
            totalPrice += e.price
        });

        await db.collection("bootstore_checkouts").insertOne({
            user: userId,
            timestamp: Date.now(),
            products: productsData,
            price: totalPrice
        });

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}

export async function GetHistoryController(req, res) {

    try {

        const userId = res.locals.user._id

        const history = await db.collection("bootstore_checkouts").find({ user: userId });

        return history;

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}

export async function MyStoreController(req, res) {

    try {

        const userId = res.locals.user._id
        let store = []

        const products = await db.collection("bootstore_mystore").find({ user: userId });
        products.forEach(async e => {
            let product = await db.collection("bootstore_products").findOne({ productID: e })
            store = [...store, product]
        })

        res.send(products)

    } catch (err) { return res.status(500).send("Error accessing database while loading user's cart."); }
}