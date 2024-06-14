import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// const PORT = Number(env('PORT', '3000'));

const PORT = 3000;

export default function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
