import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import { User } from '../models';

import { ConflictError } from '../errors';

import { ERR_TEXT_409 } from '../settings';

export const signUp: RequestHandler = (req, res, next) => {
  void (async () => {
    const { first_name, last_name, email, password } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({ first_name, last_name, email, password: passwordHash });

      res.status(201).send(newUser);
    } catch (e) {
      next(new ConflictError(ERR_TEXT_409));
    }
  })();
};
