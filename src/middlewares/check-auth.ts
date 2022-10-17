import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../errors';

import { ERR_TEXT_401 } from '../settings';

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user != null) {
    next();
  } else {
    next(new UnauthorizedError(ERR_TEXT_401));
  }
};
