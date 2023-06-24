import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserProfilesService } from 'src/domains/domain-member/user-profiles/user-profiles.service';
import { UsersService } from 'src/domains/domain-auth/users/users.service';
import { MemberMeResponseDto } from './dto/member-me.response.dto';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { GenderEnum } from '../enums/gender.enum';

@Injectable()
export class MembersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userProfilesService: UserProfilesService,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async me(userId: number) {
    const user = await this.usersService.findOne({
      id: userId,
    });
    const userProfile = await this.userProfilesService.findOne({
      userId: userId,
    });

    return new MemberMeResponseDto(user, userProfile);
  }
}
