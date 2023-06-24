import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from './entities/user-device.entity';
import { UserWeightsController } from './user-devices.controller';
import { UserDevicesService } from './user-devices.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevice])],
  controllers: [UserWeightsController],
  providers: [UserDevicesService],
  exports: [UserDevicesService],
})
export class UserDevicesModule {}
