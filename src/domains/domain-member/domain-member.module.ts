import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MembersModule],
})
export class DomainMemberModule {}
