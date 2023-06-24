import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DtoClass {
  @ApiProperty({ example: false })
  @IsOptional()
  isActive?: boolean;
}
