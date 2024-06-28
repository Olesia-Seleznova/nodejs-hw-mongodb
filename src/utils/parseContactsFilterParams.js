import { typeContactsList } from '../constants/contacts.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;

  const parsedValue = Boolean(value);

  return parsedValue;
};

export const parseContactsFilterParams = ({ contactType, isFavorite }) => {
  const parsedContactType = typeContactsList.includes(contactType)
    ? contactType
    : null;
  const parsedIsFavorite = parseBoolean(isFavorite);

  return {
    contactType: parsedContactType,
    isFavorite: parsedIsFavorite,
  };
};
