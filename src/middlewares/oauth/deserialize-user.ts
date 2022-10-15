import { TUserModel } from '../../models';

export const deserializeUser = (user: TUserModel, cb: (a: any, b: any) => void): void => {
  process.nextTick(function () {
    return cb(null, user);
  });
};
