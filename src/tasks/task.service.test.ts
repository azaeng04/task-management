import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

describe(`TaskService`, () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: TasksRepository,
          useValue: {
            getTasks: jest.fn(),
          },
        },
        TasksService,
      ],
    }).compile();

    tasksRepository = module.get(TasksRepository);
    tasksService = module.get(TasksRepository);
  });

  describe(`getTasks`, () => {
    test('should call TasksRepository.getTasks and returns the result', async () => {
      const expected: Task[] = [
        {
          id: '',
          title: '',
          description: '',
          status: TaskStatus.OPEN,
          user: null,
        },
      ];

      jest.spyOn(tasksRepository, 'getTasks').mockResolvedValueOnce(expected);

      const actual = await tasksService.getTasks(null, null);

      expect(tasksRepository.getTasks).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(expected);
    });
  });
});
