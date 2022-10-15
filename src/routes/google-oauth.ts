import { Router } from 'express';
import passport from 'passport';

const routerGoogleOauth = Router();

routerGoogleOauth.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

routerGoogleOauth.get(
  '/auth/callback/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

export { routerGoogleOauth };
