import { getAllContacts } from '../services/contacts.js';

export const getAll = async (req, res, next) => {
  try {
    const contacts = await getAllContacts.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const contactsController = { getAll };
