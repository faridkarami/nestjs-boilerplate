import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domains/domain-auth/users/entities/user.entity';
import { UserProfile } from '../../user-profiles/entities/user-profile.entity';
import { filesUtility } from 'src/files/files.utility';

class MemberMeResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  dateTime: Date;

  @ApiProperty({ type: String })
  phoneNumber: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  firstName: string = null;

  @ApiProperty({ type: String })
  lastName: string = null;

  @ApiProperty({ type: String })
  avatar: string = null;

  // @ApiProperty({ type: GenderEnum })
  // gender: GenderEnum;
}

export class MemberMeResponseDto extends MemberMeResponse {
  constructor(user: User, userProfile: UserProfile) {
    super();

    this.id = user.id;
    this.dateTime = user.createdAt;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.username = user.username;
    if (userProfile) {
      this.firstName = userProfile.firstName;
      this.lastName = userProfile.lastName;
      this.avatar = filesUtility.getPath(userProfile.avatar);
    }
  }
}
