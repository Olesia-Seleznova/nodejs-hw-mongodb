import { model, Schema } from 'mongoose';

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  isFavourite: {
    type: boolean,
    required: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    default: 'personal',
  },
  timestamps: true,
  versionKey: false,
});

export const ContactsCollection = model('contacts', contactsSchema);