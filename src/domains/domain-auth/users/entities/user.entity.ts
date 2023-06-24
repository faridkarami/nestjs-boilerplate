import { BeforeInsert, Column, Entity, Index, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ModelClass } from 'src/utils/classes/model.class';
import { Role } from 'src/domains/domain-auth/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends ModelClass {
  @Column({ unique: true, nullable: true })
  email: string | null;

  @Column({ unique: true, nullable: true, length: 50 })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column()
  provider: string;

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  @Exclude()
  role?: Role | null;

  @BeforeInsert()
  async setPassword(password: string) {
    if (password || this.password) {
      this.password = await bcrypt.hash(
        password || this.password,
        await bcrypt.genSalt(),
      );
    }
  }
}
