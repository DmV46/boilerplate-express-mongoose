import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT as string;

export const MONGODB_URI = process.env.MONGODB_URI as string;

export const EXPESS_SESSION_SECRET = process.env.EXPESS_SESSION_SECRET as string;

export const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL as string;

export const PATH_LOG_ERROR_FILE = process.env.PATH_LOG_ERROR_FILE ?? 'request.log';
export const PATH_LOG_REQUEST_FILE = process.env.PATH_LOG_REQUEST_FILE ?? 'error.log';
