import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvidersEnum } from 'src/domains/domain-auth/auth/auth-providers.enum';
import { Role, RoleEnum } from 'src/domains/domain-auth/roles';
import { User } from 'src/domains/domain-auth/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  private readonly data = {
    email: 'admin@eioit.com',
    password: 'FK8iL83ElKdWN7Cn',
  };

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          provider: AuthProvidersEnum.email,
          email: this.data.email,
          password: this.data.password,
          role: {
            id: RoleEnum.admin,
          } as Role,
        }),
      );
    }
  }
}
