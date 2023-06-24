import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators';
import { DtoClass } from 'src/utils/classes/dto.class';

export class CreateUserWithUsernamePasswordDto extends DtoClass {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  username: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}
