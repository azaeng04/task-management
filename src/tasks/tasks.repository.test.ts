import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

describe(`TasksRepository`, () => {
  let tasksRepository: TasksRepository;
  let taskRepo: Repository<Task>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: {},
        },
      ],
    }).compile();

    tasksRepository = module.get(TasksRepository);
    taskRepo = module.get(getRepositoryToken(Task));
  });

  test('placeholder', async () => {});
});
