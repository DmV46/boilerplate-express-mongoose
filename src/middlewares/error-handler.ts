import { NextFunction, Request, Response } from 'express';

import { ERR_SERVER } from '../settings';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {
  const { statusCode = 500, message } = err;

  // if (isCelebrate(err)) {
  //   return res.status(400).send({ message: err.joi.message });
  // }

  const errorMessage = { message: statusCode === 500 ? ERR_SERVER : message };

  return res.status(statusCode).send(errorMessage);
};
