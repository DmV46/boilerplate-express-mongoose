import { TUserModel } from '../../models';

export const serializeUser = (user: TUserModel & { id: string }, cb: (a: any, b: any) => void): void => {
  process.nextTick(function () {
    cb(null, user);
  });
};
