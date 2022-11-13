import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string) {
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      throw new NotFoundException(`The task with ID ${id} was not found`);
    }
    return taskFound;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  patchTaskStatusById(id: string, taskStatus: UpdateTaskStatusDto) {
    const { status } = taskStatus;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string) {
    const taskFound = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskFound.id);
  }
}
