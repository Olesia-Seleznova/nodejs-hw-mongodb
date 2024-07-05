import Joi from 'joi';

import { emailRegexp } from '../constants/contacts.js';

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a type of text.',
    'string.empty': 'Username is required and cannot be empty.',
    'string.min': 'Username should have a minimum length of 3 characters.',
    'string.max': 'Username should have a maximum length of 20 characters.',
    'any.required': 'Username is a required field.',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'Email should be a type of text.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a type of text.',
    'string.empty': 'Password is required and cannot be empty.',
    'string.min': 'Password should have a minimum length of 3 characters.',
    'string.max': 'Password should have a maximum length of 20 characters.',
    'any.required': 'Password is a required field.',
  }),
});
