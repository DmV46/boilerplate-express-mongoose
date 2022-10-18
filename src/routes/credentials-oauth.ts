import { Router } from 'express';
import passport from 'passport';

const routerCredentialsOauth = Router();

routerCredentialsOauth.post(
  '/auth/credentials',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);

export { routerCredentialsOauth };
