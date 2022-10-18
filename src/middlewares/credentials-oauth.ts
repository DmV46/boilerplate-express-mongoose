import bcrypt from 'bcryptjs';
import { IStrategyOptions, Strategy, VerifyFunction } from 'passport-local';

import { User } from '../models';

const credentialsVerify: VerifyFunction = (username, password, cb) => {
  void (async () => {
    console.log(username, password);
    const user = await User.findOne({ email: username }).select('+password');

    if (!user) {
      return cb(null, false);
    }

    const doMatched = await bcrypt.compare(password, user.password as string);

    if (!doMatched) {
      return cb(null, false);
    }

    return cb(null, user);
  })();
};

const credentialsOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

export const credentialsStrategy = new Strategy(credentialsOptions, credentialsVerify);
