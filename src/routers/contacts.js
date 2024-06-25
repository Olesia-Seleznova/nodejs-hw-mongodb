import { Router } from 'express';

import { contactsController } from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(contactsController.getAll));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.getById),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(contactsController.createContact),
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(contactsController.updateContact),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.deleteContact),
);

export default contactsRouter;
