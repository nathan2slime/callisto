// Dependencies
import { Router } from 'express';

// Utils
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user';

const userRouter = Router();

const userMiddlewares: UserMiddleware = new UserMiddleware();
const userControllers: UserController = new UserController();

userRouter.post('/create', userMiddlewares.validate, userControllers.create);
userRouter.post('/login', userControllers.login);

export default userRouter;
