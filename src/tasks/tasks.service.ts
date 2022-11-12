import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

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
          task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    const taskCopy = this.tasks.slice();
    taskCopy.push(task);
    this.tasks = taskCopy;

    return task;
  }

  patchTaskStatusById(id: string, status: TaskStatus) {
    const tasksCopy = this.tasks.slice();
    const task = this.getTaskById(id);
    task.status = status;
    this.tasks = tasksCopy;
    return task;
  }

  deleteTaskById(id: string) {
    const tasksCopy = this.tasks.slice();
    this.tasks = tasksCopy.filter((task) => task.id !== id);
  }
}
