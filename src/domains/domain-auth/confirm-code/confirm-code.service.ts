import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CachingService } from 'src/utils/caching/caching.service';

const prefix = 'confirmCode.';

@Injectable()
export class ConfirmCodeService {
  constructor(
    private cachingService: CachingService,
    private configService: ConfigService,
  ) {}

  async create(phoneNumber: string, code: string) {
    let result = true;
    const status = await this.findOne(phoneNumber);
    if (status === null) {
      // await this.cachingService.set(`${prefix}${phoneNumber}`, code, {
      //   ttl: this.configService.get('sms.timeout'),
      // });
    } else {
      result = false;
    }
    return result;
  }

  async findOne(phoneNumber: string) {
    return await this.cachingService.get(`${prefix}${phoneNumber}`);
  }

  async delete(phoneNumber: string) {
    await this.cachingService.del(`${prefix}${phoneNumber}`);
  }
}
