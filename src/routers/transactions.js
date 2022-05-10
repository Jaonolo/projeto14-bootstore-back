import { Router } from "express";
import { UserValidator } from '../middlewares/user.js';

// import { aController, bController } from '../controllers/transactions.js';
// import { aMiddleware, bMiddleware } from '../middlewares/transactions.js';

const transactionsRouter = Router();
transactionsRouter.use(UserValidator);

// transactionsRouter.post("/a", aMiddleware, aController);
// transactionsRouter.post("/b", bMiddleware, bController);

export default transactionsRouter;