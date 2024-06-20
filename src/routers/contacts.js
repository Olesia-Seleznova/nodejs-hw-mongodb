import { Router } from 'express';
import { contactsController } from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', contactsController.getAll);

export default contactsRouter;
