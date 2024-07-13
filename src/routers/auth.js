import { Router } from 'express';

import {
  signupController,
  signinController,
  refreshController,
  signoutController,
  requestResetEmailController,
} from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  userSignupSchema,
  userSigninSchema,
  requestResetTokenSchema,
} from '../validation/user.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(signoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetTokenSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
