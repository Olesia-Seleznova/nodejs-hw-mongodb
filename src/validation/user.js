import Joi from 'joi';

import { emailRegexp } from '../constants/users.js';

export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a type of text.',
    'string.empty': 'Username is required and cannot be empty.',
    'string.min': 'Username should have a minimum length of 3 characters.',
    'string.max': 'Username should have a maximum length of 20 characters.',
    'any.required': 'Username is a required field.',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'Email should be a type of text.',
    'string.pattern.base': 'Email must be a valid email address.',
    'any.required': 'Email is a required field.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a type of text.',
    'string.empty': 'Password is required and cannot be empty.',
    'string.min': 'Password should have a minimum length of 3 characters.',
    'string.max': 'Password should have a maximum length of 20 characters.',
    'any.required': 'Password is a required field.',
  }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'Email should be a type of text.',
    'string.pattern.base': 'Email must be a valid email address.',
    'any.required': 'Email is a required field.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a type of text.',
    'string.empty': 'Password is required and cannot be empty.',
    'string.min': 'Password should have a minimum length of 3 characters.',
    'string.max': 'Password should have a maximum length of 20 characters.',
    'any.required': 'Password is a required field.',
  }),
});

export const requestResetTokenSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of text.',
    'string.empty': 'Email is required and cannot be empty.',
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is a required field.',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Token should be a type of string',
    'string.empty': 'Token cannot be an empty field',
    'any.required': 'Token is a required field',
  }),
});
