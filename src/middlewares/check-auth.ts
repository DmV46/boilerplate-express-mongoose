import { NextFunction, Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user != null) {
    next();
  } else {
    res.status(401).send({ message: 'Not Authorized' });
  }
};
