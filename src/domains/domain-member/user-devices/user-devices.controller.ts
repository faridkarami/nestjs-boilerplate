import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum, RoleType, RoleGuard } from 'src/domains/domain-auth/roles';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { CurrentUser, ICurrentUser } from 'src/utils/decorators';
import { JwtGuard } from 'src/utils/guards';
import { IpAddress } from 'src/utils/decorators/ip-address.decorator';

@ApiBearerAuth()
@RoleType(RoleEnum.user)
@UseGuards(JwtGuard, RoleGuard)
@ApiTags('User Device')
@Controller({
  path: 'user/devices',
  version: '1',
})
export class UserWeightsController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  update(
    @Body() createUserDeviceDto: CreateUserDeviceDto,
    @CurrentUser() currentUser: ICurrentUser,
    @IpAddress() ipAddress,
  ) {
    return this.userDevicesService.update(
      { ...createUserDeviceDto, ipAddress: ipAddress },
      currentUser.id,
    );
  }
}
