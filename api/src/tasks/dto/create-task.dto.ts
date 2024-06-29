import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, nullable: true, default: TaskStatus.ToDo })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
