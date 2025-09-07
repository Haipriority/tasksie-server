// tasks.controller.ts
import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param, Patch,UnauthorizedException,Headers } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtService } from '@nestjs/jwt';

@UseGuards(JwtAuthGuard) // protect all routes in this controller (or place per-route)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
    // private readonly jwt: JwtService, // ⬅️ inyectamos JwtService

  ) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req) {
    const userId = req.user.id ?? req.user.sub; // depends on your JwtStrategy payload
    return this.tasksService.create(dto, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id ?? req.user.sub;
    return this.tasksService.findAllForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    console.log("Getting task", id, "for user", req.user);
    const userId = req.user.id ?? req.user.sub;
    console.log("UserId:", userId, "ReqUser:", req.user);
    return this.tasksService.findOneForUser(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() dto: UpdateTaskDto,@Req() req,) {
    console.log("Editing task", id, "with data", dto, "for user", req.user);
    // JwtAuthGuard + JwtStrategy deben dejarte esto listo
    const userId = req.user?.id ?? req.user?.sub;
    return this.tasksService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id ?? req.user.sub;
    return this.tasksService.remove(id, userId);
  }
}
