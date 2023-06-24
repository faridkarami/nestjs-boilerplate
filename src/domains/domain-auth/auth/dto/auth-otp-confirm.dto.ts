import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';

export class AuthOtpConfirmDto {
  @ApiProperty({ example: '09121234567' })
  @IsNotEmpty()
  // @Validate(IsExist, ['User'], {
  //   message: 'userNotExists',
  // })
  phoneNumber: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  code: string;
}
