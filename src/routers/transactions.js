import { Router } from "express";
import { UserValidator } from '../middlewares/userValidator.js';

import { ListCartController, AddCartController } from '../controllers/cart.js';
import { AddCartMiddleware } from '../middlewares/cart.js';
import { CheckoutController, GetHistoryController, MyStoreController } from "../controllers/checkout.js";

const transactionsRouter = Router();
transactionsRouter.use(UserValidator);

transactionsRouter.get("/cart", ListCartController);
transactionsRouter.post("/cart", AddCartMiddleware, AddCartController);
transactionsRouter.post("/checkout", CheckoutController);
transactionsRouter.get("/checkout", GetHistoryController)
transactionsRouter.get("/mystore", MyStoreController)

export default transactionsRouter;