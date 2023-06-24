import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators';
import { DtoClass } from 'src/utils/classes/dto.class';
import { FileEntity } from 'src/files/entities/file.entity';
import { GenderEnum } from '../../enums/gender.enum';

export class CreateUserProfileDto extends DtoClass {
  @ApiProperty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  referralCode?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cityId?: number;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  avatar?: FileEntity | null;

  @ApiProperty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'UserNotExists',
  })
  userId: number;
}
