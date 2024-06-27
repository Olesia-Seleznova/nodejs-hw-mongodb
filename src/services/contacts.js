import { ContactsCollection } from '../db/models/contacts.js';
import { calcPaginationsData } from '../utils/calcPaginationsData.js';

export const getAll = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  const data = await ContactsCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactsCollection.countDocuments();

  const { totalPages, hasPreviousPage, hasNextPage } = calcPaginationsData({
    total: totalItems,
    page,
    perPage,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createContact = async ({
  name,
  phoneNumber,
  email = null,
  isFavourite = false,
  contactType = 'personal',
}) => {
  return await ContactsCollection.create({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });
};

export const updateContact = async (contactId, payload) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true },
  );
};

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
};

export const contactsSevices = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
