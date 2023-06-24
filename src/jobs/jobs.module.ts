import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProducerJob } from './queue-producer.job';
import { QueueConsumerJob } from './queue-consumer.job';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'data-queue',
    }),
  ],
  providers: [QueueProducerJob, QueueConsumerJob],
  exports: [QueueProducerJob, QueueConsumerJob],
})
export class JobsModule {}
