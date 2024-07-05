import { UserCollection } from '../db/models/user.js';

export const findUser = (filter) => UserCollection.findOne(filter);

export const signup = async (data) => UserCollection.create(data);
