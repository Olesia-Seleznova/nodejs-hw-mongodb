import createHttpError from 'http-errors';
import { contactsSevices } from '../services/contacts.js';

export const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsSevices.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsSevices.getById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await contactsSevices.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const contact = await contactsSevices.updateContact(
    req.params.contactId,
    req.body,
  );
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContact = async (req, res, next) => {
  const result = await contactsSevices.deleteContact();
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export const contactsController = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
