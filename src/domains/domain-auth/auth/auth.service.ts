import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginWithPassword(authLoginDto: AuthLoginDto) {
    const user = await this.usersService.findOne({
      // TODO not working with phoneNumber fix it
      email: authLoginDto.email,
    });
    const isMatch = user?.password
      ? await bcrypt.compare(authLoginDto.password, user.password)
      : false;

    if (!(user && isMatch)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return {
      token,
      user: user,
    };
  }
}
