import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User) {
    return this.tasksRepository.getTaskById(id, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatusById(
    id: string,
    taskStatus: UpdateTaskStatusDto,
    user: User,
  ) {
    return this.tasksRepository.updateTaskStatusById(id, taskStatus, user);
  }

  async deleteTaskById(id: string) {
    return this.deleteTaskById(id);
  }
}
