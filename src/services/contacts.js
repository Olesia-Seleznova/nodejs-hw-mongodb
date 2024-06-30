import { ContactsCollection } from '../db/models/contacts.js';
import { calcPaginationsData } from '../utils/calcPaginationsData.js';

export const getAll = async ({
  filter,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;

  const databaseQuery = ContactsCollection.find();

  if (filter.contactType) {
    databaseQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    databaseQuery.where('isFavorite').equals(filter.isFavourite);
  }

  const data = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.find().countDocuments();

  const filteredItems = await ContactsCollection.find()
    .merge(databaseQuery)
    .countDocuments();

  const { totalPages, hasPreviousPage, hasNextPage } = calcPaginationsData({
    total: filteredItems,
    page,
    perPage,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    filteredItems,
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
