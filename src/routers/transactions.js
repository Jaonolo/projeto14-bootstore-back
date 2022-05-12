import { Router } from "express";
import { UserValidator } from '../middlewares/userValidator.js';

import { ListCartController, AddCartController } from '../controllers/cart.js';
import { AddCartMiddleware } from '../middlewares/cart.js';

const transactionsRouter = Router();
transactionsRouter.use(UserValidator);

transactionsRouter.get("/cart", ListCartController);
transactionsRouter.post("/cart", AddCartMiddleware, AddCartController);

export default transactionsRouter;