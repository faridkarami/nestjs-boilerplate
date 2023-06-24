import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthOtpLoginDto } from './dto/auth-otp-login.dto';
import { AuthOtpConfirmDto } from './dto/auth-otp-confirm.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthOtpService } from './services/auth-otp.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class UsersAuthController {
  constructor(
    private authService: AuthService,
    private authOtpService: AuthOtpService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.loginWithPassword(authLoginDto);
  }

  @Post('otp/')
  @HttpCode(HttpStatus.OK)
  public async loginOTP(@Body() authOtpLoginDto: AuthOtpLoginDto) {
    const { status, ...result } =
      await this.authOtpService.loginWithPhoneNumber(authOtpLoginDto);
    if (status) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.TOO_MANY_REQUESTS,
          errors: {
            message: `Too many attempts try again later`,
          },
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  @Post('otp/confirm')
  @HttpCode(HttpStatus.OK)
  public async confirmOTP(@Body() authOtpConfirmDto: AuthOtpConfirmDto) {
    return await this.authOtpService.confirmWithPhoneNumber(authOtpConfirmDto);
  }
}
