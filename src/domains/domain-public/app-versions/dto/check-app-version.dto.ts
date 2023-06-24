import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ClientEnum } from '../enums/client.enum';

export class CheckAppVersionDto {
  @ApiProperty({ example: 'iOS' })
  @IsString()
  @IsEnum(ClientEnum)
  @Expose({ name: 'x-platform' })
  @IsNotEmpty()
  'X-Platform': ClientEnum;

  @ApiProperty({ example: '12.0' })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'x-client-version' })
  'X-Client-Version': string;
}
