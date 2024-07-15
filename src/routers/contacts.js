import { Router } from 'express';

import { contactsController } from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middleware/authenticate.js';

import { upload } from '../middleware/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/contacts', ctrlWrapper(contactsController.getAll));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.getById),
);

contactsRouter.post(
  '/contacts',
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(contactsController.createContact),
);

contactsRouter.patch(
  '/contacts/:contactId',
  upload.single('photo'),
  validateBody(updateContactsSchema),
  ctrlWrapper(contactsController.updateContact),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.deleteContact),
);

export default contactsRouter;
