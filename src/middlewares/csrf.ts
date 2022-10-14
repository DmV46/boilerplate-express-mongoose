import { NextFunction, Request, Response } from 'express';

export const csrfToken = (req: Request, res: Response, next: NextFunction): void => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
