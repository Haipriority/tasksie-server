// task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() title: string;
  @Column({ nullable: true }) description?: string;
  @Column({ default: 'open' }) status: 'open' | 'todo' | 'in_progress' | 'done';
  @Column({ type: 'timestamptz', default: () => 'now()' }) createdAt: Date;
  @Column({ type: 'timestamptz', default: () => 'now()' }) updatedAt: Date;

  @Column('uuid', { nullable: false }) userId: string; // NOT NULL
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
