import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators';
import { DtoClass } from 'src/utils/classes/dto.class';
import { FileEntity } from 'src/files/entities/file.entity';

export class UpdateMemberDto extends DtoClass {
  @ApiProperty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'UserNotExists',
  })
  userId: number;

  @ApiProperty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  targetStep: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  targetWater: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cityId: number;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  avatar: FileEntity | null;
}
