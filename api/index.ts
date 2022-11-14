import express, { Application } from 'express';
import { config } from 'dotenv';
import connectDB from './db';
import helmet from 'helmet';
import cors from 'cors';
import v1Router from './v1/routes';
import v2Router from './v2/routes';

// Load env variables
config();

// Connect to MongoDB
connectDB();

const app: Application = express();

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(helmet())
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 3600,
    })
  )
  .use('/api/v1/myths', v1Router)
  .use('/api/v2/myths', v2Router);

export default app;
