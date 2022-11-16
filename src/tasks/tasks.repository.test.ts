import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

describe(`TasksRepository`, () => {
  let taskRepository: TasksRepository;
  let taskRepo: Repository<Task>;
  let selectQb;

  beforeEach(async () => {
    selectQb = {
      where: jest.fn(),
      getMany: jest.fn(),
      andWhere: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        TasksRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue(selectQb),
          },
        },
      ],
    }).compile();

    taskRepository = module.get(TasksRepository);
    taskRepo = module.get(getRepositoryToken(Task));
  });
  test('should have createQueryBuilder called once with "task"', async () => {
    const createQueryBuilderSpy = jest.spyOn(taskRepo, 'createQueryBuilder');

    await taskRepository.getTasks({}, null);

    expect(createQueryBuilderSpy).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('task');
  });

  test('should have createQueryBuilder called once with "task"', async () => {
    const createQueryBuilderSpy = jest.spyOn(taskRepo, 'createQueryBuilder');

    await taskRepository.getTasks({}, null);

    expect(createQueryBuilderSpy).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('task');
  });
  describe(`status and search undefined and null user`, () => {
    test('should have query.where called once', async () => {
      const selectQbWhereSpy = jest.spyOn(selectQb, 'where');

      await taskRepository.getTasks({}, null);

      expect(selectQbWhereSpy).toHaveBeenCalledTimes(1);
    });

    test('should have query.where called with null user', async () => {
      const selectQbWhereSpy = jest.spyOn(selectQb, 'where');

      await taskRepository.getTasks({}, null);

      expect(selectQbWhereSpy).toHaveBeenCalledWith({ user: null });
    });
  });

  describe(`status defined and search undefined and null user`, () => {
    test('should call query.andWhere once', async () => {
      const tasksFilterDto = { status: TaskStatus.OPEN };
      const selectQbAndWhereSpy = jest.spyOn(selectQb, 'andWhere');

      await taskRepository.getTasks(tasksFilterDto, null);

      expect(selectQbAndWhereSpy).toHaveBeenCalledTimes(1);
    });

    test('should call query.andWhere to have been called with status set to open and "task.status = :status"', async () => {
      const tasksFilterDto = { status: TaskStatus.OPEN };
      const selectQbAndWhereSpy = jest.spyOn(selectQb, 'andWhere');

      await taskRepository.getTasks(tasksFilterDto, null);

      expect(selectQbAndWhereSpy).toHaveBeenCalledWith(
        'task.status = :status',
        { status: TaskStatus.OPEN },
      );
    });
  });

  describe(`status and search defined and null user`, () => {});
});
