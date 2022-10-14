import { Router } from 'express';
import passport from 'passport';

import { deserializeUser, serializeUser } from '../controllers';

import { routerGoogleOauth } from './google-aouth';

const rootRouter = Router();

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

rootRouter.use(routerGoogleOauth);
rootRouter.get('/', (req, res) => {
  res.send({ user: req.user ?? 'undefined user' });
});
export { rootRouter };
