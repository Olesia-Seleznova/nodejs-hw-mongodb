import { Router } from 'express';

import { signupController } from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema } from '../validation/user.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

export default authRouter;
