// Dependencies
import { Router } from 'express';
import CarController from '../controllers/car.controller';

// Utils
import UserMiddleware from '../middlewares/user';

const carRouter = Router();

const userMiddlewares: UserMiddleware = new UserMiddleware();
const carControllers: CarController = new CarController();

carRouter.post('/create', userMiddlewares.isAdmin, carControllers.create);
carRouter.delete('/delete/:id', userMiddlewares.isAdmin, carControllers.delete);
carRouter.put('/update', userMiddlewares.isAdmin, carControllers.update);
carRouter.get('/all', carControllers.all);
carRouter.get('/:id', carControllers.show);

export default carRouter;
