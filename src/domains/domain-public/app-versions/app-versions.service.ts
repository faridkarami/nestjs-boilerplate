import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppVersion } from './entities/app-version.entity';
import { ConfigService } from '@nestjs/config';
import { ClientEnum } from './enums/client.enum';
import { CheckAppVersionDto } from './dto/check-app-version.dto';
import { UpdateStatusEnum } from './enums/update-status.enum';

@Injectable()
export class AppVersionsService {
  constructor(
    @InjectRepository(AppVersion)
    private readonly appVersionRepository: Repository<AppVersion>,

    private configService: ConfigService,
  ) {}

  async check(checkAppVersionDto: CheckAppVersionDto) {
    const client = ClientEnum[checkAppVersionDto['X-Platform']];
    const clientVersion = Number(checkAppVersionDto['X-Client-Version']);

    const clientVersionRecords = await this.appVersionRepository.find({
      where: {
        client: client,
      },
    });

    const versionsAfterClient = clientVersionRecords.filter(
      (x) => x.version > clientVersion,
    );
    const latestAppVersion = clientVersionRecords.at(-1);
    const anyForcedInTheFuture = versionsAfterClient.filter((x) => x.isForce);

    let result = UpdateStatusEnum.NoUpdate;

    clientVersion === latestAppVersion?.version &&
      (result = UpdateStatusEnum.NoUpdate);
    clientVersion < latestAppVersion?.version &&
      anyForcedInTheFuture.length === 0 &&
      (result = UpdateStatusEnum.JustUpdate);
    clientVersion < latestAppVersion?.version &&
      anyForcedInTheFuture.length !== 0 &&
      (result = UpdateStatusEnum.ForceUpdate);
    clientVersion > latestAppVersion?.version &&
      (result = UpdateStatusEnum.AheadUpdate);

    return {
      status: result,
    };
  }
}
