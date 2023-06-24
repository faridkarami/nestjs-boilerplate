import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: '01234567890' })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: 'test' })
  @IsOptional()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}
