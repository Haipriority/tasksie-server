// tasks.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const task = this.tasksRepo.create({
      ...dto,
      userId, // ← IMPORTANT: this populates the NOT NULL FK
    });
    return this.tasksRepo.save(task);
  }

  async findAllForUser(userId: string) {
    return this.tasksRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOneForUser(id: string, userId: string) {
    console.log("Finding task", id, "for user", userId);
    const task = await this.tasksRepo.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('Task not found');
    // if (!task) console.log("Task not found or access denied");
    return task;
  }

  // tasks.service.ts
  async update(id: string, dto: UpdateTaskDto, userId: string) {
    const result = await this.tasksRepo.update(
      { id, userId },                          // valida dueño en la query
      { ...dto, updatedAt: new Date() as any },// actualiza campos
    );
    if (!result.affected) {
      // no existe o no te pertenece
      throw new ForbiddenException('Access denied or task not found');
    }
    return this.tasksRepo.findOne({ where: { id, userId } });
  }

  // Fast path: delete by criteria uses FK directly
  async remove(id: string, userId: string) {
    const result = await this.tasksRepo.delete({ id, userId });
    if (!result.affected) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }
}
