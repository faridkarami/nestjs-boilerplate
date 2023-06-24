import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { SmsService } from 'src/domains/domain-external/sms/sms.service';
import { ConfirmCodeService } from '../../confirm-code/confirm-code.service';
import { Role, RoleEnum } from 'src/domains/domain-auth/roles';
import { generateVerificationCode } from 'src/utils/helper';
import { AuthOtpLoginDto } from '../dto/auth-otp-login.dto';
import { AuthOtpConfirmDto } from '../dto/auth-otp-confirm.dto';
import { UsersService } from '../../users/users.service';
import { AuthProvidersEnum } from '../auth-providers.enum';
import { AuthResponseService } from '../auth.response';
import { UserDevicesService } from 'src/domains/domain-member/user-devices/user-devices.service';

@Injectable()
export class AuthOtpService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    // private smsService: SmsService,
    private confirmCodeService: ConfirmCodeService,
    private authResponseService: AuthResponseService,
    private readonly userDevicesService: UserDevicesService,
  ) {}

  async loginWithPhoneNumber(authOtpLoginDto: AuthOtpLoginDto) {
    const result = {
      status: false,
      code: '',
    };
    const code = generateVerificationCode();
    // Save Confirm Code
    result.status = await this.confirmCodeService.create(
      authOtpLoginDto.phoneNumber,
      code,
    );

    if (result.status) {
      // await this.smsService.sendConfirmCode({
      //   receptor: authOtpLoginDto.phoneNumber,
      //   code: code,
      //   hash: authOtpLoginDto.hash,
      // });
      delete result.code;

      // if (this.configService.get('app.nodeEnv') === 'development') {
      //   result.code = code;
      // }
    }

    return result;
  }

  async confirmWithPhoneNumber(authOtpConfirmDto: AuthOtpConfirmDto) {
    const confirmCode = await this.confirmCodeService.findOne(
      authOtpConfirmDto.phoneNumber,
    );
    if (confirmCode === authOtpConfirmDto.code) {
      await this.confirmCodeService.delete(authOtpConfirmDto.phoneNumber);

      let user = await this.usersService.findOne({
        phoneNumber: authOtpConfirmDto.phoneNumber,
      });

      if (!user) {
        user = await this.usersService.create({
          provider: AuthProvidersEnum.phoneNumber,
          phoneNumber: authOtpConfirmDto.phoneNumber,
          role: {
            id: RoleEnum.user,
          } as Role,
        });
        await this.userDevicesService.create(user.id);
      }

      const jwtToken = this.jwtService.sign({
        id: user.id,
        role: user.role,
      });

      return await this.authResponseService.get(jwtToken);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            code: `confirmCodeNotValid:${authOtpConfirmDto.code}`,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
