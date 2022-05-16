import { Router } from 'express';

import {

    SetProductsController, GetProductsController,
    EditProductsController, DeleteProductsController,
    GetProductsByCategoryController, GetProductsByStatusController,
    GetProductsByNameController, GetProductsByPriceController,
    GetProductsByRangePriceController, GetProductsByQuantityController,
    GenerateRandomProductsController

} from '../controllers/products.js';

import {

    SetProductsMiddleware, GetProductsMiddleware,
    EditProductsMiddleware, DeleteProductsMiddleware,
    GetProductsByCategoryMiddleware, GetProductsByStatusMiddleware,
    GetProductsByNameMiddleware, GetProductsByPriceMiddleware,
    GetProductsByRangePriceMiddleware, GetProductsByQuantityMiddleware,
    // GenerateRandomProductsMiddleware

} from '../middlewares/products.js';

import { UserValidator } from '../middlewares/userValidator.js';

const productsRouter = Router();

productsRouter.use(UserValidator);

productsRouter.post("/setProducts", SetProductsMiddleware, SetProductsController);
productsRouter.get("/getProducts", GetProductsMiddleware, GetProductsController);

productsRouter.post("/editProducts", EditProductsMiddleware, EditProductsController);
productsRouter.delete("/deleteProducts", DeleteProductsMiddleware, DeleteProductsController);
productsRouter.get("/getProductsByCategory/:productCategory", GetProductsByCategoryMiddleware, GetProductsByCategoryController);
productsRouter.get("/getProductsByStatus/:productStatus", GetProductsByStatusMiddleware, GetProductsByStatusController);
productsRouter.get("/getProductsByName/:productName", GetProductsByNameMiddleware, GetProductsByNameController);
productsRouter.get("/getProductsByPrice/:productPrice", GetProductsByPriceMiddleware, GetProductsByPriceController);
productsRouter.get("/getProductsByRangePrice/:productPriceMin/:productPriceMax", GetProductsByRangePriceMiddleware, GetProductsByRangePriceController);
productsRouter.get("/getProductsByQuantity/:productQuantity", GetProductsByQuantityMiddleware, GetProductsByQuantityController);

productsRouter.get("/GenerateRandomProducts", GenerateRandomProductsController); // acho que nao precisa de middleware

export default productsRouter;