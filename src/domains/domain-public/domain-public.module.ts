import { Module } from '@nestjs/common';
import { AppVersionsModule } from './app-versions/app-versions.module';

@Module({
  imports: [AppVersionsModule],
})
export class DomainPublicModule {}
