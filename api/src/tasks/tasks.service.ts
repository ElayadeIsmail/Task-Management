import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto, currentUserId: string) {
    return this.prismaService.task.create({
      data: {
        ...createTaskDto,
        creatorId: currentUserId,
      },
    });
  }

  async findAll(currentUserId: string) {
    return this.prismaService.task.findMany({
      where: {
        creatorId: currentUserId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string, currentUserId: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id, creatorId: currentUserId },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async update(id: string, body: UpdateTaskDto, currentUserId: string) {
    const task = await this.findOne(id, currentUserId);
    Object.assign(task, body);
    await this.prismaService.task.update({
      where: {
        id,
      },
      data: task,
    });
    return task;
  }

  async remove(id: string, currentUserId: string) {
    const task = await this.prismaService.task.delete({
      where: {
        id,
        creatorId: currentUserId,
      },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
