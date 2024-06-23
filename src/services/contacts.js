import { ContactsCollection } from '../db/models/contacts.js';

export const getAll = async () => {
  return await ContactsCollection.find();
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
  return await ContactsCollection.findOneAndDelete(contactId);
};

export const contactsSevices = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
