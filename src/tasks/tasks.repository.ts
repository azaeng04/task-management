import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string) {
    const isTaskFound = await this.tasksRepository.findOneBy({ id });
    if (!isTaskFound) {
      throw new NotFoundException(`The task with ID ${id} was not found`);
    }
    return isTaskFound;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async updateTaskStatusById(id: string, taskStatus: UpdateTaskStatusDto) {
    const { status } = taskStatus;
    const task = await this.getTaskById(id);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string) {
    const result = await this.tasksRepository.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException(
        `The following task with ID: ${id} was not found`,
      );
  }
}
