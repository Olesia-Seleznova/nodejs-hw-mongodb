import { UserCollection } from '../db/models/user.js';

export const register = async ({ username, password }) => {
  if (!email) {
    email = null;
  }
  return await UserCollection.create({
    username,
    email,
    password,
  });
};

export const authServices = {
  register,
};
