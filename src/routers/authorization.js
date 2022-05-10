import { Router } from 'express';

import { LoginController, RegisterController, LogoutController } from '../controllers/authorization.js';
import { LoginMiddleware, RegisterMiddleware } from '../middlewares/authorization.js';

const authorizationRouter = Router();

authorizationRouter.post("/login", LoginMiddleware, LoginController);
authorizationRouter.post("/register", RegisterMiddleware, RegisterController);
authorizationRouter.post("/logout", LogoutController)

export default authorizationRouter;