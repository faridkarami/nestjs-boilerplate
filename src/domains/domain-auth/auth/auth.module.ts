import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { ConfirmCodeModule } from '../confirm-code/confirm-code.module';
import { UsersAuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MembersModule } from 'src/domains/domain-member/members/members.module';
import { AuthOtpService } from './services/auth-otp.service';
import { AuthResponseService } from './auth.response';
import { UserDevicesModule } from 'src/domains/domain-member/user-devices/user-devices.module';

@Module({
  imports: [
    UsersModule,
    ConfirmCodeModule,
    MembersModule,
    UserDevicesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
  ],
  controllers: [UsersAuthController],
  providers: [
    AuthService,
    AuthOtpService,
    AuthResponseService,
    JwtStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
