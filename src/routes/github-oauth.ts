import { Router } from 'express';
import passport from 'passport';

const routerGithubOauth = Router();

routerGithubOauth.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

routerGithubOauth.get(
  '/auth/callback/github',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

export { routerGithubOauth };
