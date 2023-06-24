import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileRepository.save(
      this.userProfileRepository.create({
        ...createUserProfileDto,
      }),
    );
  }

  findOne(fields: EntityCondition<UserProfile>) {
    return this.userProfileRepository.findOne({
      relations: {
        user: true,
      },
      where: fields,
    });
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    this.userProfileRepository.update(
      { userId: id },
      {
        ...updateUserProfileDto,
      },
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.userProfileRepository.softDelete(id);
  }
}
