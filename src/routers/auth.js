import { Router } from 'express';
import { authController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post('/register', ctrlWrapper(authController.register));

export default authRouter;
