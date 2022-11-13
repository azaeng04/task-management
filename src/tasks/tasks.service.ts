import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto) {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string) {
    return this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTaskStatusById(id: string, taskStatus: UpdateTaskStatusDto) {
    return this.updateTaskStatusById(id, taskStatus);
  }

  async deleteTaskById(id: string) {
    return this.deleteTaskById(id);
  }
}
