import { Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CachingService } from './caching.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as unknown as CacheStore,
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),

        ttl: 86400000,
        max: 10000,
        isGlobal: true,
      }),
    }),
  ],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
