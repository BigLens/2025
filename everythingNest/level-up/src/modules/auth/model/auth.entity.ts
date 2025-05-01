import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/entities/base-entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
