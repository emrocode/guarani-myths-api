import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import v1Router from './v1/routes';

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
  .use('/api/v1/myths', v1Router);

module.exports = app;
