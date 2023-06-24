import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators';
import { DtoClass } from 'src/utils/classes/dto.class';

export class CreateUserWithPhoneNumberDto extends DtoClass {
  @ApiProperty({ example: '09121234567' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'phoneNumberAlreadyExists',
  })
  phoneNumber: string;
}
