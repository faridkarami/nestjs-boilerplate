import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestHeader } from 'src/utils/decorators';
import { AppVersionsService } from './app-versions.service';
import { CheckAppVersionDto } from './dto/check-app-version.dto';

@ApiTags('Public')
@Controller({
  path: 'public',
  version: '1',
})
export class AppVersionsController {
  constructor(private readonly appVersionsService: AppVersionsService) {}

  @Get('/app-version')
  @HttpCode(HttpStatus.OK)
  async check(
    // @RequestHeader() checkAppVersionDto: CheckAppVersionDto,
    @RequestHeader(CheckAppVersionDto) checkAppVersionDto: CheckAppVersionDto,
  ) {
    return this.appVersionsService.check(checkAppVersionDto);
  }
}
