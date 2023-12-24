import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../enum/role';
import { Provider } from '../enum/provider';

@Entity()
export class UserModel extends BaseModel {
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
  provider: string;
}
