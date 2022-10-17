import expressWinston from 'express-winston';
import winston from 'winston';

import { PATH_LOG_ERROR_FILE } from '../../settings';

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: PATH_LOG_ERROR_FILE })],
  format: winston.format.json(),
});
