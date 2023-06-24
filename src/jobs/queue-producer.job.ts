import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueProducerJob {
  constructor(
    @InjectQueue('data-queue')
    private queue: Queue,
  ) {}
  async fill(entity, dto: any) {
    await this.queue.add('fill-job', {
      entity: entity,
      values: dto,
    });
  }
}
