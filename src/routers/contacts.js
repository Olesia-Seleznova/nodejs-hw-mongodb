import { Router } from 'express';
import { contactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(contactsController.getAll));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.getById),
);

contactsRouter.post('/contacts', ctrlWrapper(contactsController.createContact));

contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.updateContact),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.deleteContact),
);

export default contactsRouter;
