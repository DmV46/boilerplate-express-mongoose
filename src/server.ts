import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import passport from 'passport';

import { rootRouter } from './routes';

import {
  credentialsStrategy,
  errorHandler,
  errorLogger,
  githubStrategy,
  googleStrategy,
  rateLimiter,
  requestLogger,
} from './middlewares';

import { EXPESS_SESSION_SECRET, MONGODB_URI, PORT } from './settings';

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connect to mongoDB'))
  .catch((error) => console.log(error));

app.use(rateLimiter);
app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: 'app-sesson-id',
    secret: EXPESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(credentialsStrategy);

app.use(requestLogger);
app.use(rootRouter);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Start on port: ${PORT}`));
