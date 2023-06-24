import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum, RoleType, RoleGuard } from 'src/domains/domain-auth/roles';
import { MembersService } from './members.service';
import { CurrentUser, ICurrentUser } from 'src/utils/decorators';
import { UserProfilesService } from '../user-profiles/user-profiles.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtGuard } from 'src/utils/guards/jwt.guard';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@ApiBearerAuth()
@RoleType(RoleEnum.user, RoleEnum.admin)
@UseGuards(JwtGuard, RoleGuard)
@ApiTags('User')
@Controller({
  path: 'users',
  version: '1',
})
export class MembersController {
  constructor(
    private membersService: MembersService,
    private userProfilesService: UserProfilesService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.CREATED)
  me(@CurrentUser() currentUser: ICurrentUser) {
    return this.membersService.me(currentUser.id);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const memberUpdate = { ...updateMemberDto };
    return this.userProfilesService.update(currentUser.id, memberUpdate);
  }
}
