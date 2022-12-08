// Dependencies
import { Router } from 'express';

// Routers
import userRouter from './user.route';
import carRouter from './car.route';

const router = Router();

router.use('/user', userRouter);
router.use('/car', carRouter);

export default router;
