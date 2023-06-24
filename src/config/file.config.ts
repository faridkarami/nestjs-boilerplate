import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  driver: process.env.FILE_DRIVER,
  maxFileSize: process.env.FILE_SIZE,
}));
