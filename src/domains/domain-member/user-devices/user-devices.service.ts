import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UserDevice } from './entities/user-device.entity';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import * as _ from 'lodash';

@Injectable()
export class UserDevicesService {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
  ) {}

  async create(userId: number) {
    return this.userDeviceRepository.save(
      this.userDeviceRepository.create({
        userId: userId,
      }),
    );
  }

  update(createUserDeviceDto: CreateUserDeviceDto, userId: number) {
    return this.userDeviceRepository.update(
      { userId: userId },
      {
        ...createUserDeviceDto,
      },
    );
  }

  findOne(fields: EntityCondition<UserDevice>) {
    return this.userDeviceRepository.findOne({
      where: fields,
      order: { id: 'DESC' },
    });
  }
}
