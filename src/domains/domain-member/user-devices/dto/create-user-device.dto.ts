import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DtoClass } from 'src/utils/classes/dto.class';
import { UserDeviceInstallationSourcesEnum } from '../enums/user-device-installation-source.enum';
import { UserDeviceOperationSystemsEnum } from '../enums/user-device-operation-systems.enum';

export class CreateUserDeviceDto extends DtoClass {
  @ApiProperty({ example: 'iOS' })
  @IsString()
  @IsEnum(UserDeviceOperationSystemsEnum)
  @IsNotEmpty()
  operationSystem: UserDeviceOperationSystemsEnum;

  @ApiProperty({ example: '12.0' })
  @IsString()
  @IsNotEmpty()
  systemVersion: string;

  @ApiProperty({ example: '82' })
  @IsString()
  @IsNotEmpty()
  buildNumber: string;

  @ApiProperty({ example: 'Apple' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsEmpty()
  ipAddress: string;

  @ApiProperty({ example: 'APPLESTORE' })
  @IsString()
  @IsEnum(UserDeviceInstallationSourcesEnum)
  @IsNotEmpty()
  installationSource: UserDeviceInstallationSourcesEnum;

  @ApiProperty({ example: '1.0.0' })
  @IsString()
  @IsNotEmpty()
  appVersion: string;
}
