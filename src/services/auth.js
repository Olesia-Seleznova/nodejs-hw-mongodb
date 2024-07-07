import { UserCollection } from '../db/models/user.js';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => UserCollection.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return UserCollection.create({ ...data, password: hashPassword });
};
