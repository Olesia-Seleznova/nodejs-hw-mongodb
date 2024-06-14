import dotenv from 'dotenv';

dotenv.config();

export const env = (name, defaultValue) => {
  const value = process.env[name];
  if (value !== undefined && value !== null) return value;
  if (defaultValue !== undefined && defaultValue !== null) return defaultValue;
  throw new Error(`Missing: process.env['${name}']`);
};
