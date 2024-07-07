import { Router } from 'express';

import { signupController, signinController } from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema } from '../validation/user.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

export default authRouter;
