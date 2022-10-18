import { Router } from 'express';
import passport from 'passport';

import { checkAuth } from '../middlewares';
import { deserializeUser, logout, serializeUser } from '../middlewares/oauth';

import { routerCredentialsOauth } from './credentials-oauth';
import { routerGithubOauth } from './github-oauth';
import { routerGoogleOauth } from './google-oauth';
import { routerUser } from './user';

const rootRouter = Router();

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

rootRouter.use(routerGoogleOauth);
rootRouter.use(routerGithubOauth);
rootRouter.use(routerCredentialsOauth);

rootRouter.use(routerUser);

rootRouter.post('/auth/logout', logout);

rootRouter.get('/', (req, res) => {
  res.send({ user: req.user ?? 'undefined user' });
});

rootRouter.get('/check-auth', checkAuth, (req, res) => {
  res.send({ route: 'this private routes' });
});

export { rootRouter };
