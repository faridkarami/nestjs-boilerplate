import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { UserProfilesModule } from 'src/domains/domain-member/user-profiles/user-profiles.module';
import { UsersModule } from 'src/domains/domain-auth/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';

@Module({
  imports: [
    UsersModule,
    UserProfilesModule,
    TypeOrmModule.forFeature([UserProfile]),
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
