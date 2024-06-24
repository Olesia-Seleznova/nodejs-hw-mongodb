import createHttpError from 'http-errors';
import { authServices } from '../services/auth.js';

export const register = async (req, res, _next) => {
  const { username, password, email } = req.body;
  const newUser = await authServices.register({ username, password, email });
  res.status(201).json({
    status: 201,
    message: 'Successfully registered!',
    data: newUser,
  });
};

export const authController = {
  register,
};
