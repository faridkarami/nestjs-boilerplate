import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Job } from 'bull';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';

@Processor('data-queue')
export class QueueConsumerJob {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Process('fill-job')
  async fillJob(job: Job) {
    const { entity, values } = job.data;

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(values)
      .execute();
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }
}
