import { Strategy } from 'passport-google-oauth20';

import { TUserModel, User } from '../models';

import { OAUTH_CALLBACK_URL } from '../settings';

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
    callbackURL: `${OAUTH_CALLBACK_URL}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, cb) => {
    void (async () => {
      console.log(accessToken, refreshToken, profile, cb);
      const {
        id,
        provider,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _json: { email, picture: avatar, given_name, family_name },
      } = profile;

      const userProvider = { id, provider };

      const user = await User.findOne({ providers: { $elemMatch: userProvider } });

      if (user != null) {
        return cb(null, user);
      }

      const newUser: TUserModel = {
        first_name: given_name,
        last_name: family_name,
        avatar,
        email: email as string,
        date_of_creation: new Date(),
        providers: [userProvider],
      };

      const userCreated = await User.create(newUser);

      return cb(null, userCreated);
    })();
  },
);
