import { Router } from 'express';
import passport from 'passport';

import { deserializeUser, logout, serializeUser } from '../middlewares/oauth';

import { routerGithubOauth } from './github-oauth';
import { routerGoogleOauth } from './google-oauth';

const rootRouter = Router();

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

rootRouter.use(routerGoogleOauth);
rootRouter.use(routerGithubOauth);

rootRouter.post('/auth/logout', logout);

rootRouter.get('/', (req, res) => {
  res.send({ user: req.user ?? 'undefined user' });
});

export { rootRouter };
