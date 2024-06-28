import createHttpError from 'http-errors';
import { contactsSevices } from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactsFilterParams } from '../utils/parseContactsFilterParams.js';

import { contactsFieldList } from '../constants/contacts.js';

export const getAll = async (req, res, _next) => {
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);

  const { sortBy, sortOrder } = parseSortParams(query, contactsFieldList);

  const filter = parseContactsFilterParams(query);

  const contacts = await contactsSevices.getAll({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getById = async (req, res, _next) => {
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

export const deleteContact = async (req, res, _next) => {
  const { contactId } = req.params;
  const result = await contactsSevices.deleteContact(contactId);
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
