import { Router } from 'express';

import { signUp } from '../controllers';

const routerUser = Router();

routerUser.post('/signup', signUp);

export { routerUser };
