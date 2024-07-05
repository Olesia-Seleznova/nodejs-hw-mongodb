import { Schema, model } from 'mongoose';

import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const sesssionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sesssionSchema.post('save', mongooseSaveError);

sesssionSchema.pre('findOneAndUpdate', setUpdateSettings);

sesssionSchema.post('findOneAndUpdate', mongooseSaveError);

export const SessionCollection = model('session', sesssionSchema);
