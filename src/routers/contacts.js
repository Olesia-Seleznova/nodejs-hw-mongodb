import { Router } from 'express';
import { contactsController } from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', contactsController.getAll);

contactsRouter.get('/contacts/:contactId', contactsController.getById);

contactsRouter.post('/contacts', contactsController.createContact);

contactsRouter.patch('/contacts/:contactId', contactsController.updateContact);

contactsRouter.delete('/contacts/:contactId', contactsController.deleteContact);

export default contactsRouter;
