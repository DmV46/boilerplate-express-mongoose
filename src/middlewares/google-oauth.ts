import { Profile, Strategy } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-oauth2';

import { OAUTH_CALLBACK_URL } from '../settings';

import { verifyUserBySocial } from './oauth';

const googleOptions = {
  clientID: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  callbackURL: `${OAUTH_CALLBACK_URL}/auth/callback/google`,
};

const googleVerify = (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback): void => {
  void (async () => {
    const { id, provider } = profile;
    const { email, picture, given_name, family_name } = profile._json;

    await verifyUserBySocial(id, provider, email, given_name, family_name, picture, cb);
  })();
};

export const googleStrategy = new Strategy(googleOptions, googleVerify);
