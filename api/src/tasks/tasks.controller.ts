import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser('sub') currentUserId: string,
  ) {
    return this.tasksService.create(createTaskDto, currentUserId);
  }

  @Get()
  findAll(@ActiveUser('sub') currentUserId: string) {
    return this.tasksService.findAll(currentUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser('sub') currentUserId: string) {
    return this.tasksService.findOne(id, currentUserId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser('sub') currentUserId: string,
  ) {
    return this.tasksService.update(id, updateTaskDto, currentUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser('sub') currentUserId: string) {
    return this.tasksService.remove(id, currentUserId);
  }
}
