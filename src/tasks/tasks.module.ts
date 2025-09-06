import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => AuthModule), // brings in JwtService + guard
  ], // <-- provides Repository<Task>
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService], // if other modules need it
})
export class TasksModule {}
