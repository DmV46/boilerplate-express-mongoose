import expressWinston from 'express-winston';
import winston from 'winston';

import { PATH_LOG_REQUEST_FILE } from '../../settings';

export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: PATH_LOG_REQUEST_FILE })],
  format: winston.format.json(),
});
