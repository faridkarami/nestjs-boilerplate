import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Config
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import redisConfig from './config/redis.config';
import fileConfig from './config/file.config';

import { TypeOrmConfigService } from './database/typeorm-config.service';
import { JobsModule } from './jobs/jobs.module';

import { IsExist, IsNotExist } from './utils/validators';

import { FilesModule } from './files/files.module';

import { DomainAuthModule } from './domains/domain-auth/domain-auth.module';
import { DomainMemberModule } from './domains/domain-member/domain-member.module';
import { DomainPublicModule } from './domains/domain-public/domain-public.module';
import { DomainSocketsModule } from './domains/domain-socket/domain-sockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, redisConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
    }),
    ScheduleModule.forRoot(),

    FilesModule,
    DomainAuthModule,
    DomainMemberModule,
    DomainPublicModule,
    DomainSocketsModule,
    JobsModule,
  ],
  providers: [IsExist, IsNotExist],
})
export class AppModule {}
