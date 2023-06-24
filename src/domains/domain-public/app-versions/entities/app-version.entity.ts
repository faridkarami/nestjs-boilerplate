import { Column, Entity } from 'typeorm';
import { ModelClass } from 'src/utils/classes/model.class';
import { ClientEnum } from '../enums/client.enum';

@Entity()
export class AppVersion extends ModelClass {
  @Column({
    type: 'enum',
    enum: ClientEnum,
  })
  client: ClientEnum;

  @Column({ type: 'int' })
  version: number;

  @Column()
  changelog: string;

  @Column()
  isForce: boolean;
}
