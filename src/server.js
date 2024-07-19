import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

import { swaggerDocs } from './middleware/swaggerDocs.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use(contactsRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
