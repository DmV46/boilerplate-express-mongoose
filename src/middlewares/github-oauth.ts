import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';

import { OAUTH_CALLBACK_URL } from '../settings';

import { verifyUserBySocial } from './oauth';

const githubOptions = {
  clientID: process.env.GITHUB_ID as string,
  clientSecret: process.env.GITHUB_SECRET as string,
  callbackURL: `${OAUTH_CALLBACK_URL}/auth/callback/github`,
};

const githubVerify = (accessToken: string, refreshToken: string, profile: any, cb: VerifyCallback): void => {
  void (async () => {
    console.log(accessToken, refreshToken, profile, cb);

    const { id, provider } = profile;
    const { email, avatar_url, name } = profile._json;

    await verifyUserBySocial(id, provider, email, name, 'no set', avatar_url, cb);
  })();
};

export const githubStrategy = new Strategy(githubOptions, githubVerify);
