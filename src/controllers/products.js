import mongodb from "mongodb";
import db from '../database/database.js';

export async function SetProductsController(req, res) {

    const {

        // productID,
        productName,
        productPrice,
        productDescription,
        productImage,
        productCategory,
        productQuantity,
        productStatus

    } = req.body;

    try {

        // penso que nao preciso verificar se o produto ja existe, pois cada produto tem um _id unico
        // e mesmo que o usuario cadastre um produto identico, o _id sera diferente

        const newProductID = mongodb.ObjectId();
        await db.collection("bootstore_products").insertOne({

            productID: newProductID,
            productName,
            productPrice,
            productDescription,
            productImage,
            productCategory,
            productQuantity,
            productStatus
        });

        const userId = res.locals.user._id
        const myStore = await db.collection("bootstore_mystore").findOne({ user: userId })

        if (!myStore) await db.collection("bootstore_mystore").insertOne({
            user: userId,
            storeList: [newProductID]
        });
        else {
            await db.collection("bootstore_mystore").updateOne({ user: userId }, {
                $set: { storeList: [...myStore.storeList, newProductID] }
            });
        }

        res.status(201).send({ newProductID }); // created

    } catch (err) { console.log(err); return res.status(500).send('Error accessing database during SetProductsController.'); }
}

export async function GetProductsController(req, res) {

    try {

        const products = await db.collection("bootstore_products").find({ productStatus: 'available' }).toArray();

        res.send(products);

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsController.'); }
}

export async function GetProductByIDController(req, res) {

    let { productID } = req.params;
    productID = mongodb.ObjectId(productID)

    try {
        console.log(await db.collection("bootstore_products").findOne({ productID }))
        const products = await db.collection("bootstore_products").findOne({ productID });

        res.send(products);

    } catch (err) { return res.status(500).send('Error accessing database during GetProductByIDController.'); }
}

export async function EditProductsController(req, res) {

    const { productID } = req.params;
    const { productName, productPrice, productDescription, productImage, productCategory, productQuantity, productStatus } = req.body;

    try {

        const product = await db.collection("bootstore_products").findOne({ productID });
        if (!product) return res.status(404).send('Product not found.');

        await db.collection("bootstore_products").updateOne({ productID }, {

            $set: {
                productName,
                productPrice,
                productDescription,
                productImage,
                productCategory,
                productQuantity,
                productStatus
            }
        });

        res.status(200).send('Product updated.'); // ok

    } catch (err) { return res.status(500).send('Error accessing database during EditProductsController.'); }
}

export async function DeleteProductsController(req, res) {

    const { productID } = req.params;

    try {

        const product = await db.collection("bootstore_products").findOne({ productID });
        if (!product) return res.status(404).send('Product not found.');

        await db.collection("bootstore_products").deleteOne({ productID });
        res.status(200).send('Product deleted.');

    } catch (err) { return res.status(500).send('Error accessing database during DeleteProductsController.'); }
}

export async function GetProductsByCategoryController(req, res) {

    const { productCategory } = req.params;

    try {

        const products = await db.collection("bootstore_products").find({ productCategory }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByCategoryController.'); }
}

// util para sabermos por exemplo, quais produtos estao disponiveis para venda
export async function GetProductsByStatusController(req, res) {

    const { productStatus } = req.params; // 'available' 'unavailable' ou 'in cart'

    try {

        const products = await db.collection("bootstore_products").find({ productStatus }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByStatusController.'); }
}

export async function GetProductsByNameController(req, res) {

    const { productName } = req.params;

    try {

        const products = await db.collection("bootstore_products").find({ productName }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByNameController.'); }
}

export async function GetProductsByPriceController(req, res) {

    const { productPrice } = req.params;

    try {

        const products = await db.collection("bootstore_products").find({ productPrice }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByPriceController.'); }
}

export async function GetProductsByRangePriceController(req, res) {

    const { productPriceMin, productPriceMax } = req.params;

    try {

        const products = await db.collection("bootstore_products").find({ productPrice: { $gte: productPriceMin, $lte: productPriceMax } }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByRangePriceController.'); }

}

export async function GetProductsByQuantityController(req, res) {

    const { productQuantity } = req.params;

    try {

        const products = await db.collection("bootstore_products").find({ productQuantity }).toArray();
        products ? res.send(products) : res.send('No products found.');

    } catch (err) { return res.status(500).send('Error accessing database during GetProductsByQuantityController.'); }
}

export async function GenerateRandomProductsController(req, res) {

    const categories = ['Roupas', 'Eletronicos', 'Automoveis', 'Eletrodomesticos', 'Móveis', 'Outros'];

    const price = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
        1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000];

    const description = [

        'Um produto incrivel !', 'Tem alguns defeitos mas funciona',
        'Posso dividir no cartao', 'Entrego no prazo', 'Podemos negociar ?',
        'Por favor compre,  preciso de dinheiro', 'Nao tem nada de errado',
        'Entrar em contato com Jucycleide'
    ];

    const names = [
        'Oferta incrivel', 'Vendo hoje !', 'Oportunidade unica', 'Vem que ta barato'
    ];

    const newProductID = mongodb.ObjectId();
    const randomName = [Math.floor(Math.random() * names.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomPrice = price[Math.floor(Math.random() * price.length)];
    const randomDescription = description[Math.floor(Math.random() * description.length)];
    const randomImage = `https://picsum.photos/200/200?random=${i}`;

    await db.collection("bootstore_products").insertOne({

        productID: newProductID,
        productName: randomName,
        productPrice: randomPrice,
        productDescription: randomDescription,
        productImage: randomImage,
        productCategory: randomCategory,
        productQuantity: 1,
        productStatus: 'available'
    });

    // cria o produto e insere na collection
    // sinceramente nao sei se isso vai funcionar hehe

    res.status(201).send('New product generated.');
}