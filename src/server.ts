import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { rateLimiter } from './middlewares';

import { MONGODB_URI, PORT } from './settings';

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connect to mongoDB'))
  .catch((error) => console.log(error));

app.use(rateLimiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// requestLogger;
// app.use(router);
// errorLogger;

app.listen(PORT, () => console.log(`Start on port: ${PORT}`));
