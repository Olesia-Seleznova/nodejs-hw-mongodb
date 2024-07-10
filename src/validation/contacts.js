import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a type of text.',
    'string.empty': 'Name is required and cannot be empty.',
    'string.min': 'Name should have a minimum length of 3 characters.',
    'string.max': 'Name should have a maximum length of 20 characters.',
    'any.required': 'Name is a required field.',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a type of text.',
    'string.empty': 'Phone number is required and cannot be empty.',
    'string.min': 'Phone number should have a minimum length of 3 characters.',
    'string.max': 'Phone number should have a maximum length of 20 characters.',
    'any.required': 'Phone number is a required field.',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email should be a type of text.',
    'string.email': 'Email must be a valid email address.',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'Is Favorite should be a boolean value.',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a type of text.',
    'any.only':
      'Contact type must be one of the following values: work, home, personal.',
  }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a type of text.',
    'string.empty': 'Name is required and cannot be empty.',
    'string.min': 'Name should have a minimum length of 3 characters.',
    'string.max': 'Name should have a maximum length of 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a type of text.',
    'string.empty': 'Phone number is required and cannot be empty.',
    'string.min': 'Phone number should have a minimum length of 3 characters.',
    'string.max': 'Phone number should have a maximum length of 20 characters.',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email should be a type of text.',
    'string.email': 'Email must be a valid email address.',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'Is Favorite should be a boolean value.',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a type of text.',
    'any.only':
      'Contact type must be one of the following values: work, home, personal.',
  }),
});
