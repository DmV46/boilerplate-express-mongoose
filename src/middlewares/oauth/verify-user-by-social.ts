import { VerifyCallback } from 'passport-oauth2';

import { TUserModel, User } from '../../models';

export const verifyUserBySocial = async (
  id: string,
  provider: string,
  email: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  avatar: string | undefined,
  cb: VerifyCallback,
): Promise<void> => {
  const userProvider = { id, provider };

  const userByEmail = await User.findOne({ email });
  const userByProvider = await User.findOne({ providers: { $elemMatch: userProvider } });

  if (userByEmail && userByProvider) {
    return cb(null, userByEmail);
  }

  if (!userByEmail && userByProvider) {
    return cb(null, userByProvider);
  }

  if (userByEmail && !userByProvider) {
    userByEmail.providers = [...userByEmail.providers, userProvider];

    const updateUser = await User.findOneAndUpdate({ email: userByEmail.email }, userByEmail, { new: true });

    return cb(null, updateUser as TUserModel);
  }

  const newUser: TUserModel = {
    avatar,
    email,
    first_name: firstName,
    last_name: lastName,
    providers: [userProvider],
    date_of_creation: new Date(),
  };

  const createdUser = await User.create(newUser);

  return cb(null, createdUser);
};
