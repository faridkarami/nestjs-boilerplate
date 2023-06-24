import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  host: process.env.APP_HOST,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'accept-language',
  frontendUrl: process.env.APP_FRONTEND_URL,
  backendUrl: process.env.APP_BACKEND_URL,
  sourceUrl: process.env.APP_SOURCE_URL,
}));
