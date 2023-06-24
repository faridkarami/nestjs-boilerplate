import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: configService.get('DATABASE_TYPE'),
  url: configService.get('DATABASE_URL'),
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT'), 10) || 5432,
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: configService.get('NODE_ENV') !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: parseInt(configService.get('DATABASE_MAX_CONNECTIONS'), 10) || 100,
    ssl:
      configService.get('DATABASE_SSL_ENABLED') === 'true'
        ? {
            rejectUnauthorized:
              configService.get('DATABASE_REJECT_UNAUTHORIZED') === 'true',
            ca: configService.get('DATABASE_CA') ?? undefined,
            key: configService.get('DATABASE_KEY') ?? undefined,
            cert: configService.get('DATABASE_CERT') ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
