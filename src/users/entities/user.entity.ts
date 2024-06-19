import { RoleEnum } from '@/src/enums/role.enum';
import { Task } from '@/src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  profileImg: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    default: RoleEnum.user,
  })
  role: RoleEnum;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: Date;
}
