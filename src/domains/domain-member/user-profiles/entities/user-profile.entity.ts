import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ModelClass } from 'src/utils/classes/model.class';
import { User } from 'src/domains/domain-auth/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { GenderEnum } from '../../enums/gender.enum';

@Entity()
export class UserProfile extends ModelClass {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;
  @Column()
  userId: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  avatar?: FileEntity | null;
}
