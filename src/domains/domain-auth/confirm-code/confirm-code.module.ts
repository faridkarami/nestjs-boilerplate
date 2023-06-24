import { Module } from '@nestjs/common';
import { CachingModule } from 'src/utils/caching/caching.module';
import { ConfirmCodeService } from './confirm-code.service';

@Module({
  imports: [CachingModule],
  providers: [ConfirmCodeService],
  exports: [ConfirmCodeService],
})
export class ConfirmCodeModule {}
