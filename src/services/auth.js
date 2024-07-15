import jwt from 'jsonwebtoken';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';

import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import { hashValue } from '../utils/hash.js';
import { SessionCollection } from '../db/models/session.js';

import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { sendEmail } from '../utils/sendEmail.js';
import { env } from '../utils/env.js';

export const findUser = (filter) => UserCollection.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return UserCollection.create({ ...data, password: hashPassword });
};

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSourse = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSourse);

  const html = template({
    name: user.name,
    action_url: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let userData;

  try {
    userData = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (error) {
    console.log(error.message);
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UserCollection.findOne({
    email: userData.email,
    _id: userData.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isSameAsOldPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (isSameAsOldPassword)
    throw createHttpError(
      401,
      'New password must be different from the old password',
    );

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const updatedUser = await UserCollection.findOneAndUpdate(
    { _id: user._id },
    { password: encryptedPassword },
    { new: true },
  );

  if (!updatedUser) throw createHttpError(500, 'Fail to update password');

  await SessionCollection.deleteOne({ userId: user._id });

  return updatedUser;
};
