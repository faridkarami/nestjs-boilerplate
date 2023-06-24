import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthOtpLoginDto {
  @ApiProperty({ example: '01234567890' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  hash: string;
}
